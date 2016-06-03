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


        lodash.assign(ctrl.gridOptions, ctrl.options || {});

        // var data = gridService.getData();
        // if (data) {
        ctrl.data = gridService.getData();
        // }

    }

    function gridDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/grid/grid.html',
            scope: {
                // data: '=',
                // options: '=',
                // actions: '<'
            },
            controller: 'gridController',
            controllerAs: 'ctrl',
            bindToController: true,
            link: function (scope, element, attrs) {
                // if (!scope.ctrl.options) {
                //     console.warn('no ctrl.options');
                //     // scope.$apply();
                // }

            }
        }
    }

    angular.module('grid', ['ui.grid', 'ngLodash'])
        .service('gridService', function ($timeout) {
            var data = null;
            // var options =

            function getData() {
                if (data) {
                    return data;
                } else {

                    // debugger; // todo fix this
                    $timeout(function () {
                        // setData(getData());
                    }, 1000);
                }
            }

            function setData(a) {
                data = a;
            }

            this.getData = getData;
            this.setData = setData;
        })

        .controller('gridController', gridController)
        .directive('grid', gridDirective);
})();
