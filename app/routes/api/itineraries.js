const express = require('express');
const router = express.Router();
const config = require('config');

const ModelPath = '../../models/';

const wrap = require('../../util/wrap.js');
const placeUtil = require('../../util/places.js');
const directionUtil = require('../../util/directions.js');

const weightPlaces = (places, weight) =>
    places.map((place, index) => {
        place.weight = place.rating * weight * (0.95 ** index);
        return place;
    });

const getHours = (place, date) => {
    if (place.hours)
        return place.hours;

    const day = date.getDay();
    const period = placeUtil.getDetails(place).periods.find(period => period.open.day === day);

    place.hours = {
        opening: period.open.time,
        closing: period.close.day === day ? period.close.time : period.close.time + 2400
    };

    return place.hours;
};

const nextOpenBetween = (places, date, interval) => {
    const place = places.find(place =>
        getHours(place, date).opening <= interval.start &&
        getHours(place, date).closing >= interval.end &&
        !place.used);
    place.used = true;
    return place;
};

const nextOpenBetweenN = (places, date, interval, n) =>
    [...Array(n)].map(() => nextOpenBetween(places, date, interval));

const addTimeFrameMeta = timeFrame => {
    timeFrame.delta = Math.max(timeFrame.end - timeFrame.start, 0);
    timeFrame.numEvents = Math.floor(timeFrame.delta / 1.5);
    timeFrame.numSubEvents = Math.max(numEvents - 1, 0);
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
        start: Math.min(1900, endTime),
        end: Math.max(1300, startTime)
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


router.get('/create', wrap(async (req, res) => {
    const startLoc = req.body.startLoc;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const date = req.body.date;
    const dateNoon = date + 60 * 60 * 12;
    const radius = req.body.radius;

    /*
    [
        {query: 'art', weight: 5},
        {query: 'park', weight: 6}
    ];
    */

    const categories = req.body.categories;

    const search = radius
        ? category => weightPlaces(placeUtil.searchWithinRange(startLoc, radius, category.query), category.weight)
        : category => weightPlaces(placeUtil.searchWithinCity(city, category.query), category.weight);

    const places = categories.map(search).sort((a, b) => b.weight - a.weight);

    const times = timeFrames(startTime, endTime);

    const primaryPlaces = times.map(time =>
        time.numEvents ? nextOpenBetween(places, date, time) : undefined);

    // Limit nextOpenBetween by a smaller radius?
    const subPlaces = times.map(time =>
        time.numSubEvents ? [...Array(time.numSubEvents)].map(nextOpenBetween(places, date, time)) : []);

    const costs = directionUtil.getDistanceMatrix(...[primaryPlaces], ...[subPlaces], dateNoon);



    res.sendStatus(200);
}));

module.exports = router;
