angular.module('meanApp', [
        'meanApp.auth',
        'meanApp.admin',
        'meanApp.constants',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'validation.match',
        'ngLodash',
        'meanAppDirectives',
        'meanAppServices',
        'meanAppFilters',
        '720kb.datepicker',
        'ui.bootstrap',
        'ngMaterial'
    ])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });

