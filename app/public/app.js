var angular = require('angular');
var uirouter = require('angular-ui-router');
var app = angular.module('hackru', ['ui.router', 'Routes', 'ItinerarySvc', 'ItineraryCtrl']);

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);