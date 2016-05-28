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
                    
                    ctrl.handleChange = function (page) {
                        isCallback ? ctrl.callback(page) : null;
                    };
                    console.log('ctrl', ctrl);
                    
                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
//
})();
//
