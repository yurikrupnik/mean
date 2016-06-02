(function () {
    "use strict";

    angular.module('gridPagination', ['ui.bootstrap'])
        .value('DROPDOWNOPTION', [
            {value: 0, name: 0},
            {value: 25, name: 25},
            {value: 50, name: 50},
            {value: 100, name: 100}
        ])
        .factory('pagingDropdownOptions', function (DROPDOWNOPTION) {

            var selected = DROPDOWNOPTION[1];

            function setSelected(a) {
                selected = a;
            }

            function getSelected() {
                return selected;
            }

            function getSelectedValue() {
                return selected.value;
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
                    totalCount: '=' // todo set this to service
                },
                controller: function () {
                    var ctrl = this;
                    var isCallback = lodash.isFunction(ctrl.callback);

                    ctrl.DROPDOWNOPTION = DROPDOWNOPTION;

                    ctrl.selected = pagingDropdownOptions.getSelected();
                    ctrl.handleChange = function (page) {
                        return isCallback ? ctrl.callback(page) : null;
                    };

                    ctrl.handleDropdownChange = function (item) {
                        pagingDropdownOptions.setSelected(item);
                    }


                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
//
})();
//
