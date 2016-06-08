(function () {
    "use strict";

    function gridController($scope, lodash, gridService, $timeout) {
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


        // ctrl.methods = ctrl.actions; // for some reason actions are not binded to methods

        // over write default grid options using options - todo fix first time page loads ctrl.options is empty


        lodash.assign(ctrl.gridOptions, gridService.getConfig() || {});

    }

    function gridDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/grid/grid.html',
            scope: {
                data: '='
            },
            controller: 'gridController',
            controllerAs: 'ctrl',
            bindToController: true
            // link: function (scope, element, attrs) {
            //     var ctrl = scope.ctrl;
            //     // ctrl.data = gridService.getData();
            //     // if (!scope.ctrl.options) {
            //     //     console.warn('no ctrl.options');
            //     //     // scope.$apply();
            //     // }
            //
            // }
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
