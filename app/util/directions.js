const axios = require('axios');

const getDistanceMatrix = async (places, time) => {
    //'''Returns the distance matrix between the given places given in coordinates. Each element should be in the form "lat,long". Time should be given in seconds from epoch and be at noon at the local time zone'''
    let locationsString = "";
    for (let i = 0; i < places.length; i++) {
        locationsString += places[i].geometry.location.lat + ',' + places[i].geometry.location.lng + "|"
    }
    locationsString = locationsString.slice(0, locationsString.length - 1);
    let query = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + locationsString + "&units=imperial&destinations=" + locationsString + "&departure_time=" + (time.getTime() / 1000) + "&mode=transit&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE";
    const res = await axios.get(query);
    let matrix = [];
    for (let i = 0; i < res.data.rows.length; i++) {
        matrix.push([]);
        for (let j = 0; j < res.data.rows[i].elements.length; j++) {
            matrix[i].push(res.data.rows[i].elements[j].duration.value / 60 / 60);
        }
    }
    return matrix;
};

const getDir = async (origin, dest, time) => {
    //'''Returns the route from google directions between the origin and destination departing at the given time in second from epoch. Transit mode is public transit'''
    let query = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&dest" + dest + "&mode=transit&departure_time=" + time + "&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE"
    const res = await axios.get(query);
    return res.routes[0];
};

module.exports.getDistanceMatrix = getDistanceMatrix;
module.exports.getDir = getDir;
