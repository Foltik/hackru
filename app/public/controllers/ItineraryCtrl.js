var angular = require('angular');

angular.module('ItineraryCtrl', ['ItinerarySvc']).controller('ItineraryController', ['$scope', 'ItineraryService', function($scope, ItineraryService) {
    //$scope.viewItinerary = () =>
        //ItineraryService.viewItinerary((err res) =>
            //$scope.itinerary= res.map(itinerary => Itinerary(itinerary.identifier, itinerary.scope, itinerary.itinerary)));

    $scope.createItinerary = () => {
        let categories = [
            {query: 'art', weight: $scope.art}
            {query: 'parks' , weight: $scope.parks}
            {query: 'landmarks', weight: $scope.landmarks}
            {query: 'nightlife', weight: $scope.nightlife}
            {query: 'shopping', shopping: $scope.shopping}
        ];

        ItineraryService.createItinerary($scope.loc, $scope.rad, $scope.date, $scope.starttime, $scope.endtime, categories, (err, data) => {
            console.log(data);
        });
    };
})
