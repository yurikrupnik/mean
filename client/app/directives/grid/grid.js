(function () {
    "use strict";

    function gridController(lodash, gridService) {
        var ctrl = this;
        // set default grid options
        ctrl.gridOptions = {
            data: 'ctrl.data',
            columnDefs: []
            // onRegisterApi: function (gridApi) {
            //
            // },
            // // gridMenuTitleFilter:        toggleColumnInterval,
            // enableColumnMenus: false,
            // enableFiltering: false,
            // enableGridMenu: true,
            // enableSelectAll: true,
            // // enableRowSelection:         $scope.neOptions.enableSelection,
            // enableRowHeaderSelection: false,
            // showSelectionCheckbox: false,
            // enableColumnResizing: true,
            // // pagingOptions:              $scope.pagingOptions,
            // // sortInfo:                   $scope.sortOptions,
            // totalServerItems: 'totalServerItems',
            // primaryKey: 'id'
        };

        // over write default grid options using options
        lodash.assign(ctrl.gridOptions, gridService.getConfig() || {});

    }

    function gridDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/grid/grid.html',
            scope: {
                data: '=',
                methods: '<'
            },
            controller: 'gridController',
            controllerAs: 'ctrl',
            bindToController: true
        }
    }

    angular.module('grid', ['ui.grid', 'ngLodash'])
        .service('gridService', function (lodash) {
            var config = {};


            function getConfig() {
                return config;
            }

            function setConfig(a) {
                config = lodash.isObject(a) ? a : {};
            }

            this.setConfig = setConfig;
            this.getConfig = getConfig;
        })
        .controller('gridController', gridController)
        .directive('grid', gridDirective);
})();
