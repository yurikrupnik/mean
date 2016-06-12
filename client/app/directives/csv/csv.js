(function () {
    angular.module('csv', ['ngCsv', 'ngLodash'])
        .service('csvService', function (lodash) {
            var fileName = 'download';
            var callback = function () {};

            function setFileName(a) {
                fileName = a;
            }

            function getFileName() {
                return fileName;
            }

            function setCallback(fn) {
                var isCallback = lodash.isFunction(fn);
                callback = isCallback ? fn : function () {};
            }

            function getCallback() {
                return callback();
            }

            this.setFileName = setFileName;
            this.getFileName = getFileName;
            this.setCallback = setCallback;
            this.getCallback = getCallback;
        })
        .controller('csvCtrl', function (csvService) {
            var ctrl = this;

            ctrl.handleClick = function () {
                return csvService.getCallback();
            };

            ctrl.filename = csvService.getFileName(); // set the name in controller
        })
        .directive('csv', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/csv/csv.html',
                controller: 'csvCtrl',
                controllerAs: 'csv',
                bindToController: true,
                scope: true
            }
        });
})();
