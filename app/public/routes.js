var angular = require('angular');

angular.module('Routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/views/home.html'
        })
        .state('create', {
            url: '/create',
            templateUrl: '/views/create.html'
        })
        .state('view', {
            url: '/view',
            templateUrl: '/views/view.html'
        });
}]);
