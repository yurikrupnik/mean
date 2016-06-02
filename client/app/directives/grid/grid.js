(function () {
    angular.module('grid', ['ui.grid', 'ngLodash'])
        .service('gridService', function () {
            this.doWhatEverIWant = function () {
                console.log('lol');

            }
        })
        .directive('grid', function (lodash, gridService) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/grid/grid.html',
                scope: {
                    data: '=',
                    options: '='
                },
                controller: function () {
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
                    gridService.doWhatEverIWant();

                    // if (ctrl.gridOptions.columnDefs.length===0) {
                    //     lodash.assign(ctrl.gridOptions, ctrl.options || {} );
                    //     console.warn('empty!!!!!!!!!!!'); // fix it
                    // }
                    // over write default grid options using options
                    lodash.assign(ctrl.gridOptions, ctrl.options || {} );

                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
})();
