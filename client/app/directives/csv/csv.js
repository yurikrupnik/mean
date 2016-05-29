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
                templateUrl: 'app/directives/csv/csv.html',
                scope: {
                    callback: '<'
                },
                controller: function () {
                    var ctrl = this;
                    var isCallback = lodash.isFunction(ctrl.callback);

                    ctrl.handleClick = function () {
                        return isCallback ? ctrl.callback() : null;
                    };

                    ctrl.filename = 'what ever i want';

                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
})();
