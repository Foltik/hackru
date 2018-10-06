const axios = require('axios');
String key = '&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE';
const getPlacesWithinRange = async (location, radius, query) => {
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?location='+location[0] + ',' + location[1] + '&radius=' + radius + 'sensor=true' + '&query' + query + key);
    return res;
}
const getPlacesCity = async (city, category) =>{
    String query = category + " in " + city;
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + key);
}
