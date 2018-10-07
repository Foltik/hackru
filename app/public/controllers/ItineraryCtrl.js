var angular = require('angular');

angular.module('ItineraryCtrl', ['ItinerarySvc']).controller('ItineraryController', ['$scope', '$state', 'ItineraryService', function ($scope, $state, ItineraryService) {
    //$scope.viewItinerary = () =>
    //ItineraryService.viewItinerary((err res) =>
    //$scope.itinerary= res.map(itinerary => Itinerary(itinerary.identifier, itinerary.scope, itinerary.itinerary)));

    $scope.test = () => {
        ItineraryService.test();
    };

    $scope.load = () =>
        $scope.data = ItineraryService.load();

    $scope.createItinerary = () => {
        let categories = [
            {query: 'art museum', weight: $scope.art},
            {query: 'public park', weight: $scope.parks},
            {query: 'landmarks', weight: $scope.landmarks},
            {query: 'night club', weight: $scope.nightlife},
            {query: 'shopping center', shopping: $scope.shopping}
        ];

        categories = JSON.stringify(categories);

        ItineraryService.createItinerary(
            $scope.loc, $scope.rad,
            $scope.date, new Date($scope.starttime).getHours() * 100,
            ((new Date($scope.endtime).getHours()) < new Date($scope.starttime).getHours()
                ? ((new Date($scope.endtime).getHours()) + 24) * 100
                : (new Date($scope.endtime).getHours()) * 100),
            categories, (err, data) => {
                if (err)
                    console.log(err);
                else {
                    console.log(data);
                    ItineraryService.store(data);
                    $scope.data = data;
                    $state.go('view');
                }
            });
    };
}]);
