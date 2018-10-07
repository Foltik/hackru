const axios = require('axios');
let key = '&key=AIzaSyCL2k612OOVYYxrqP2j7t1ty8nANPpQlPE';
const getPlacesWithinRange = async (location = [51.517752, -0.064974], radius = 5000, query = 'museum') => {
    const uri = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location='+location[0] + ',' + location[1] + '&radius=' + radius + '&query=' + query + key;
    return (await axios.get(uri)).data.results;
};

const getPlacesCity = async (city, category) =>{
    let query = category + " in " + city;
    const res = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + key);
    resultList = [];
    for(let i = 0; i<res.results.length; i++){
        resultList.push(res.results[i]);
    }
    return resultList;
};

const getPlaceDetails = async (id) =>{
    let query = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+id+"&fields=opening_hours"+key;
    return (await axios.get(query)).data.result;
};
const getPlacePhotoURL = async (photoid, maxheight) => {
    let query = "https://maps.googleapis.com/maps/api/place/photo?maxheight="+maxheight+"&photoreference="+photoid+key;
    return await axios.get(query);
}

module.exports.getPlacesWithinRange = getPlacesWithinRange;
module.exports.getPlacesCity = getPlacesCity;
module.exports.getPlaceDetails = getPlaceDetails;
module.exports.getPlacePhotoURL = getPlacePhotoURL;
