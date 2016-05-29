(function () {
    "use strict";

    angular.module('gridPagination', ['ui.bootstrap'])
        .directive('gridPagination', function (lodash) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/grid-pagination/grid-pagination.html',
                scope: {
                    callback: '<',
                    totalCount: '=',
                    itemsPerPage: '='
                },
                controller: function () {
                    var ctrl = this;
                    var isCallback = lodash.isFunction(ctrl.callback);
console.log('ctrl.totalCount', ctrl.totalCount);

                    ctrl.handleChange = function (page) {
                        return isCallback ? ctrl.callback(page) : null;
                    };

                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
//
})();
//
