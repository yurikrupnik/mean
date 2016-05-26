"use strict";

angular.module('meanApp')
    .config(function ($stateProvider) {
        $stateProvider 
            .state('payments', {
                url: '/payments',
                template: '<payments></payments>'
            })
    });
