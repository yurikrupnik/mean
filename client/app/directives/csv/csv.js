(function () {
    angular.module('csv', ['ngCsv'])
        .service('csvService', function () {
            this.doWhatEverIWant = function () {
                console.log('lol');

            }
        })
        .directive('csv', function (lodash, csvService) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/csv/csv.html'
            }
        });
})();
