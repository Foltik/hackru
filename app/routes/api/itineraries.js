const express = require('express');
const router = express.Router();
const config = require('config');

const ModelPath = '../../models/';

const wrap = require('../../util/wrap.js');

router.get('/create', wrap(async (req, res) => {
    const startLoc;
    const startTime;
    const endTime;
    const date;
    const categoryWeights;
    const radius;
    const useRadius; //boolean true or false, city or use specified locationand radius
    const places;
    const querykeys = ["art","museum", "night life", "park", "attraction"];
    dayPeriods = [false,false,false]
    if(startTime<1200) dayPeriods[0] = true;
    if(startTime<1900 && endTime>1300) dayPeriods[1] = true;
    if(startTime<2500 && endTime>2000) dayPeriods[2] = true;

    for(int i = 0; i < querykeys.length; i++){
        templist=[]
        if (useRadius){
             templist = getPlacesWithinRange(startLoc, radius, querykeys[i])

        }
        else{
            templist = getPlacesCity(city, querykeys[i]);
        }
        for(int j = 0; j < templist.length; j++){
            templist.used = false;
            templist[j].weight = templist[j].rating * categoryWeights[i] * 0.95**j;//assigning weight for each place, based on global rating times user assigned weight and decay factor (~35%)
        }
        places.push.apply(places,templist);
    }
    compareFunction(a, b){return b.weight - a.weight}
    places.sort(compareFunction);
    counter = 0;
    dayOfWeek = date.getDay()
    mainPlaces = [null,null,null]
    while(dayPeriods[0]){
        if(!places[counter].used && !places[counter].opening_hours.periods) places[counter].opening_hours = getPlaceDetails(places[counter].reference).opening_hours;
        for(int i = 0; i<places[counter].opening_hours.periods.length; i++){
            if(places[counter].opening_hours.periods.open.day == dayOfWeek){
                if(open<1200) {
                    dayPeriods[0] = false;
                    mainPlaces[0] = places[counter];
                    places[counter].used = true;
                }
            }
        }
        counter++;
    }
    counter = 0
    while(dayPeriods[1]){
        if(!places[counter].used && !places[counter].opening_hours.periods) places[counter].opening_hours = getPlaceDetails(places[counter].reference).opening_hours;
        for(int i = 0; i<places[counter].opening_hours.periods.length; i++){
            if(places[counter].opening_hours.periods.open.day == dayOfWeek){

                if(open<1900 && close > 1400) {
                    dayPeriods[1] = false;
                    mainPlaces[1] = places[counter];
                    places[counter].used = true;
                }
            }
        }
        counter++;
    }
    counter = 0
    while(dayPeriods[2]){
        if(!places[counter].used && !places[counter].opening_hours.periods) places[counter].opening_hours = getPlaceDetails(places[counter].reference).opening_hours;
        for(int i = 0; i<places[counter].opening_hours.periods.length; i++){
            if(places[counter].opening_hours.periods.open.day == dayOfWeek){
                if(open<2500 && close>2000) {
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
