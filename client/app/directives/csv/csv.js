(function () {
    angular.module('csv', ['ngCsv'])
        .service('csvService', function () {
            var fileName = 'download';

            function setFileName(a) {
                fileName = a;
            }

            function getFileName() {
                return fileName;
            }

            this.setFileName = setFileName;
            this.getFileName = getFileName
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
                    var callback = ctrl.callback;

                    ctrl.handleClick = function () {
                        return isCallback ? callback() : null;
                    };

                    ctrl.filename = csvService.getFileName(); // todo service control this

                },
                controllerAs: 'csv',
                bindToController: true
            }
        });
})();
