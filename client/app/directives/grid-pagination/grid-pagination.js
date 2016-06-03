(function () {
    "use strict";

    angular.module('gridPagination', ['ui.bootstrap'])
        .value('DROPDOWNOPTION', [
            {value: 0, name: 0},
            {value: 25, name: 25},
            {value: 50, name: 50},
            {value: 100, name: 100}
        ])
        .factory('pagingDropdownOptions', function (lodash, DROPDOWNOPTION) {

            var selected = lodash.head(DROPDOWNOPTION);

            function setSelected(a) {
                selected = a;
            }

            function getSelected() {
                return selected;
            }

            return {
                getSelected: getSelected,
                setSelected: setSelected
            }
        })
        .service('paginationService', function (lodash) {
            var totalCount = 0;
            var callback = function () {};

            function setTotalCount(val) {
                totalCount = val;
            }

            function getTotalCount() {
                return totalCount;
            }

            function setCallback(fn) {
                var isCallback = lodash.isFunction(fn);
                callback = isCallback ? fn : function () {};
            }

            function getCallback(page) {
                return callback(page);
            }

            this.getTotalCount = getTotalCount;
            this.setTotalCount = setTotalCount;
            this.setCallback = setCallback;
            this.getCallback = getCallback;

        })
        .directive('gridPagination', function (lodash, DROPDOWNOPTION, pagingDropdownOptions, paginationService) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/grid-pagination/grid-pagination.html',
                scope: true,
                controller: function () {
                    var ctrl = this;

                    // service
                    // var isCallback = lodash.isFunction(ctrl.callback);
                    // var callback = ctrl.callback;

                    ctrl.totalCount = paginationService.getTotalCount();

                    ctrl.DROPDOWNOPTION = DROPDOWNOPTION;

                    ctrl.selected = pagingDropdownOptions.getSelected();

                    ctrl.handlePageChange = function (page) {
                        debugger;
                        return paginationService.getCallback(page);
                    };

                    ctrl.handleDropdownChange = function (item) {
                        pagingDropdownOptions.setSelected(item);
                    }


                },
                controllerAs: 'pagination',
                bindToController: true
            }
        });

})();

