
const axios = require('axios');
const getDistMat = async (places, time) => {
    '''Returns the distance matrix between the given places given in coordinates. Each element should be in the form "lat,long". Time should be given in seconds from epoch and be at noon at the local time zone'''
    let locationsString=""
    for(let i = 0; i<places.length, i++){
        locationsString+=places[i]+"|"
    }
    locationsString = locationsString.slice(0,s.length-1);
    let query = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+locationsString+"&destinations="+locationsString+"&departure_time="+time+"&mode=transit&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE"
    const res = await axios.get(query);
    let matrix = [];
    for(let i = 0; i<res.rows.length; i++){
        matrix.push([]);
        for(let j = 0; j<res.rows[i].elements.length; j++){
            matrix[i].push(res.rows[i].elements[j].duration.value);
        }
    }
    return matrix;
}
const getDir = async (origin, dest, time) =>{
    '''Returns the route from google directions between the origin and destination departing at the given time in second from epoch. Transit mode is public transit'''
    let query = "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&dest"+dest+"&mode=transit&departure_time="+time+"&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE"
    const res = await axios.get(query);
    return res.routes[0];
}
