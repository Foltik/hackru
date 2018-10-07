var angular = require('angular');

angular.module('ItinerarySvc', []).service('ItineraryService', ['$http', function ($http) {
    this.createItinerary = (loc, rad, date, starttime, endtime, categories, cb) => {
        console.log(loc);
        console.log(rad);
        console.log(date);
        console.log(starttime);
        console.log(endtime);
        console.log(categories);

        $http({
            method: 'GET',
            url: '/api/itineraries/create',
            params: {
                startLoc: loc,
                radius: rad,
                date: date,
                startTime: starttime,
                endTime: endtime,
                categories: categories
            }
        }).then(res => cb(null, res.data))
          .catch(err => cb(err));
    };

    let data = [];
    this.store = newData =>
        data = newData;

    this.load = () =>
        data;
}]);
