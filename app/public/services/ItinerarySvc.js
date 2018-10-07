var angular = require('angular');

angular.module('ItinerarySvc', []).service('ItineraryService', ['$http', function($http) {
    this.createItinerary= (loc, rad, date, starttime, endtime, categories, cb) =>
        $http({
            method: 'get'
            url: '/create'
            data: {
                startLoc: loc,
                radius: rad,
                date: date,
                startTime: starttime,
                endTime: endtime,
                categories: categories
            }
        }).then(res => {
            cb(null, res.data)
        }).catch(err =>{
            cb(err);
        });

/*        this.viewItinerary = cb =>
            $http({
                method: 'get'
                url: '/viewitinerary'
            }).then(res => {
                cb(null, res.data)
            }).catch(err =>{
                cb(err);
            });*/
}]);
