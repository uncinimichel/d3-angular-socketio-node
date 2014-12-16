'use strict';

angular
    .module('Skeleton', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'd3',
        'socketClient'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/twitterMap/twitter-map.html',
                controller: 'TwitterMapController'
            })
            .when('/dragon', {
                templateUrl: 'components/fractalDragon/fractal-dragon-partial.html',
                controller: 'FractalDragon'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
