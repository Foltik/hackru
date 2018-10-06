const axios = require('axios');
String key = '&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE';
const getPlacesWithinRange = async (location, radius, query) => {
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?location='+location[0] + ',' + location[1] + '&radius=' + radius + 'sensor=true' + '&query' + query + key);
    resultList = [];
    for(int i = 0; i<res.results.length; i++){
        resultList.push(res.results[i]);
    }
    return resultList;
}
const getPlacesCity = async (city, category) =>{
    String query = category + " in " + city;
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + key);
    resultList = [];
    for(int i = 0; i<res.results.length; i++){
        resultList.push(res.results[i]);
    }
    return res;
    return resultList;
}
const getPlaceDetails = async (id) =>{
    query = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+id+"&fields=opening_hours"+key;
    const res = await axios.get(query);
    return res;
}
