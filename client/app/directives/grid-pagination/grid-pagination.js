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
        .directive('gridPagination', function (lodash, DROPDOWNOPTION, pagingDropdownOptions) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/grid-pagination/grid-pagination.html',
                scope: {
                    callback: '<',
                    totalCount: '='
                },
                controller: function () {
                    var ctrl = this;
                    var isCallback = lodash.isFunction(ctrl.callback);
                    var callback = ctrl.callback;

                    ctrl.DROPDOWNOPTION = DROPDOWNOPTION;

                    ctrl.selected = pagingDropdownOptions.getSelected();
                    ctrl.handlePageChange = function (page) {
                        return isCallback ? callback(page) : null;
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

