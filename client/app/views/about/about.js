'use strict';

angular.module('meanApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                template: '<about></about>'
            });
    });
