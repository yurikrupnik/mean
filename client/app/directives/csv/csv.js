(function () {
    angular.module('csv', ['ngCsv'])
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
        .directive('csv', function (csvService) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/csv/csv.html',
                controller: function () {
                    var ctrl = this;

                    ctrl.handleClick = function () {
                        return csvService.getCallback();
                    };

                    ctrl.filename = csvService.getFileName(); // set the name in controller
                },
                controllerAs: 'csv',
                bindToController: true,
                scope: true
            }
        });
})();
