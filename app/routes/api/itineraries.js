const express = require('express');
const router = express.Router();
const config = require('config');

const ModelPath = '../../models/';

const wrap = require('../../util/wrap.js');
const places = require('../../util/places.js');

router.get('/create', wrap(async (req, res) => {
    // string
    const startLoc = req.body.startLoc;

    // unix timestamp
    const startTime = req.body.startTime;

    // unix timestamp
    const endTime = req.body.endTime;

    // unix timestamp
    const date = req.body.date;

    // number
    const radius = req.body.radius;

    /*
    [
        {query: 'art', weight: 5},
        {query: 'park', weight: 6}
    ];
    */
    const categories = req.body.categories;


    const calcWeights = (places, weight) =>
        places.map((place, index) => {
            place.weight = place.rating * weight * (0.95 ** index);
            return place;
        });

    const search = radius
        ? category => calcWeights(places.getPlacesWithinRange(startLoc, radius, category.query), category.weight)
        : category => calcWeights(places.getPlacesCity(city, category.query), category.weight);

    const places = categories.map(search).sort((a, b) => b.weight - a.weight);

    dayPeriods = [false, false, false];
    if (startTime < 1200) dayPeriods[0] = true;
    if (startTime < 1900 && endTime > 1300) dayPeriods[1] = true;
    if (startTime < 2500 && endTime > 2000) dayPeriods[2] = true;

    counter = 0;
    dayOfWeek = date.getDay()
    mainPlaces = [null, null, null]
    while (dayPeriods[0]) {
        if (!places[counter].used && !places[counter].opening_hours.periods) places[counter].opening_hours = getPlaceDetails(places[counter].reference).opening_hours;
        for (int i = 0;
        i < places[counter].opening_hours.periods.length;
        i++
    )
        {
            if (places[counter].opening_hours.periods.open.day == dayOfWeek) {
                if (open < 1200) {
                    dayPeriods[0] = false;
                    mainPlaces[0] = places[counter];
                    places[counter].used = true;
                }
            }
        }
        counter++;
    }
    counter = 0
    while (dayPeriods[1]) {
        if (!places[counter].used && !places[counter].opening_hours.periods) places[counter].opening_hours = getPlaceDetails(places[counter].reference).opening_hours;
        for (int i = 0;
        i < places[counter].opening_hours.periods.length;
        i++
    )
        {
            if (places[counter].opening_hours.periods.open.day == dayOfWeek) {

                if (open < 1900 && close > 1400) {
                    dayPeriods[1] = false;
                    mainPlaces[1] = places[counter];
                    places[counter].used = true;
                }
            }
        }
        counter++;
    }
    counter = 0
    while (dayPeriods[2]) {
        if (!places[counter].used && !places[counter].opening_hours.periods) places[counter].opening_hours = getPlaceDetails(places[counter].reference).opening_hours;
        for (int i = 0;
        i < places[counter].opening_hours.periods.length;
        i++
    )
        {
            if (places[counter].opening_hours.periods.open.day == dayOfWeek) {
                if (open < 2500 && close > 2000) {
                    dayPeriods[2] = false;
                    mainPlaces[2] = places[counter];
                    places[counter].used = true;
                }
            }
        }
        counter++;
    }


    res.sendStatus(200);
}));

module.exports = router;
