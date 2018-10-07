const express = require('express');
const router = express.Router();
const config = require('config');

const ModelPath = '../../models/';

const wrap = require('../../util/wrap.js');
const placeUtil = require('../../util/places.js');
const directionUtil = require('../../util/directions.js');
const optimization = require('../../util/optimization.js');

const weightPlaces = (places, weight) =>
    places.map((place, index) => {
        place.weight = place.rating * weight * (0.95 ** index);
        return place;
    });
const placeToEvent = (place) => {
    let event = {
        "type":"place",
        "name":place.name,
        "photo_reference":place.photos.photo_reference,
        "more_info":{
            "rating": place.rating,
            "tags": place.types,
            "address": place.formatted_address,
        }
    }
    return event;
};
const directionsToEvent = (start, end, time) => {
    let direction = await directionUtil.getDir(start, end, time);
    let event = {
        "type":"transit",
        "name":"Transit from "+start.name+" to "+end.name,
        "start_time":direction.routes[0].legs[0].departure_time.value,
        "end_time":direction.routes[0].legs[0].arrival_time.value,
        "more_info":{
            "route":direction.routes[0].legs[0].steps,
            "fare":direction.routes[0].fare.text,
        }
    }
};
const getHours = async (place, date) => {
    if (place.hours)
        return place.hours;

    const day = date.getDay();
    const details = await placeUtil.getPlaceDetails(place.place_id);

    place.hours = {};
    if (!details.opening_hours) {
        place.hours.closed = true;
        return place.hours;
    }

    const period = details.opening_hours.periods.find(period => period.open.day === day);
    //const period = (await placeUtil.getPlaceDetails(place.place_id)).periods.find(period => period.open.day === day);

    if (period) {
        place.hours.opening = period.open.time;
        place.hours.closing = period.close.day === day ? period.close.time : period.close.time + 2400;
        place.hours.closed = false;
    } else {
        place.hours.closed = true;
    }

    return place.hours;
};

const nextOpenBetween = async (places, date, interval) => {
    for (let i = 0; i < places.length; i++) {
        const place = places[i];
        //const hours = await getHours(place, date);
        if (!place.used
            /*
            && !hours.closed
            && hours.opening <= interval.start
            && hours.closing >= interval.end*/) {
            place.used = true;
            place.window = [interval.start, interval.end];
            return place;
        }
    }
};

const nextOpenBetweenN = (places, date, interval, n) =>
    [...Array(n)].map(() => nextOpenBetween(places, date, interval));

const addTimeFrameMeta = timeFrame => {
    timeFrame.delta = Math.max(timeFrame.end - timeFrame.start, 0);
    timeFrame.numPrimaryEvents = timeFrame.delta >= 200 ? 1 : 0;
    timeFrame.numSubEvents = Math.max(Math.floor((timeFrame.delta / 100) - 2), 0);
    return timeFrame;
};

const timeFrames = (startTime, endTime) => {
    // [startTime, 1200]
    const morning = {
        start: startTime,
        end: 1200
    };

    // [1300 or startTime, 1900 or endTime]
    const afternoon = {
        start: Math.max(1300, startTime),
        end: Math.min(1900, endTime)
    };

    // [2000 or endTime, 2600 or endTime]
    const night = {
        start: Math.min(2000, endTime),
        end: Math.min(2600, endTime)
    };

    return [
        addTimeFrameMeta(morning),
        addTimeFrameMeta(afternoon),
        addTimeFrameMeta(night)
    ];

    return {
        morning: addTimeFrameMeta(morning),
        afternoon: addTimeFrameMeta(afternoon),
        night: addTimeFrameMeta(night)
    };
};

/*
[
    {query: 'art', weight: 5},
    {query: 'park', weight: 6}
];
*/

router.get('/create', wrap(async (req, res) => {
    const startLoc = JSON.parse(req.query.startLoc);
    const startTime = parseInt(req.query.startTime);
    const endTime = parseInt(req.query.endTime);
    const date = new Date(parseInt(req.query.date, 10));
    const radius = parseInt(req.query.radius);

    const categories = JSON.parse(req.query.categories);

    const search = radius
        ? async category => weightPlaces(await placeUtil.getPlacesWithinRange(startLoc, radius, category.query), category.weight)
        : async category => weightPlaces(await placeUtil.getPlacesCity(city, category.query), category.weight);

    const places = (await Promise.all(categories.map(search)))
        .reduce((acc, curr) => [...acc, ...curr])
        .sort((a, b) => b.weight - a.weight);

    const times = timeFrames(startTime, endTime);

    /*
    const primaryPlaces = await Promise.all(
        times.map(async time => time.numPrimaryEvents ? await nextOpenBetween(places, date, time) : undefined));
    */

    let primaryPlaces = [];
    for (let i = 0; i < times.length; i++) {
        let time = times[i];
        if (time.numPrimaryEvents) {
            const place = await nextOpenBetween(places, date, time);
            if (place) {
                place.interval = time;
                place.primary = true;
                primaryPlaces.push(place);
            }
        }
    }

    const primaryDurations = [...Array(primaryPlaces.length)].map(() => 2);

    let subPlaces = [];
    for (let i = 0; i < times.length; i++) {
        let time = times[i];
        if (time.numSubEvents) {
            for (let j = 0; j < time.numSubEvents; j++) {
                const subPlace = await nextOpenBetween(places, date, time);
                if (subPlace) {
                    subPlace.interval = time;
                    subPlace.secondary = true;
                    subPlaces.push(subPlace);
                }
            }
        }
    }
    /*
    const subPlaces = times.map(time =>
        time.numSubEvents ?
            [...Array(time.numSubEvents)]
                .map(nextOpenBetween(places, date, time)) : [])
        .reduce((acc, curr) => [...acc, ...curr]);
        */
    const subPlaceDurations = [...Array(subPlaces.length)].map(() => 1);

    const allPlaces = [...primaryPlaces, ...subPlaces];
    const allDurations = [...primaryDurations, ...subPlaceDurations];
    const windows = [
        ...primaryPlaces.map(place => [0, 30000/*place.interval.start, place.interval.end*/]),
        ...subPlaces.map(subPlace => [0, 30000/*subPlace.interval.start, subPlace.interval.end*/])
    ];
    console.log('WINDOWS:');
    console.log(windows);
    console.log('\n\n\n');

    console.log('PLACES:');
    console.log(allPlaces);

    const costs = await directionUtil.getDistanceMatrix(allPlaces, date);

    const promise = optimization.findPath(
        endTime,
        allPlaces.length,
        costs,
        allDurations,
        windows);

    let path = (await promise).routes[0];
    let response = {};
    path = path.map((p, index) => allPlaces[index]);
    googleTime = date.getTime()/1000 + (Math.floor(startTime/100))*3600 + startTime%100*60;
    response.push(directionsToEvent(startLoc[0]+","+startLoc[1],path[0].formatted_address,googleTime));
    for(let i = 0; i<path.length-1; i++){
        let currentPlace = placeToEvent(path[i]));
        currentPlace.startTime = response[response.length-1].endTime;
        let elapsed = 3600;
        if(currentPlace.primary) elapsed *= 2;
        currentPlace.endTime = currentPlace.startTime + elapsed;
        response.push(currentPlace)
        response.push(directionsToEvent(path[i].formatted_address, path[i+1].formatted_address,currentPlace.endTime));
    }
    response.push(directionsToEvent(path[path.length],startLoc[0]+","+startLoc[1],response[response.length-1].endTime));

    res.status(200).json(path);
}));

module.exports = router;
