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
                        columnDefs: [
                            {field: 'id',    displayName: 'id'},
                            // {field: 'ne_type',          displayName: 'Network Element', width: '130'},
                            // {field: 'name',             displayName: 'Name',            width: '170'},
                            // {field: 'change',           displayName: 'Change'},
                            // {field: 'old_value',        displayName: 'From',            width: '60'},
                            // {field: 'new_value',        displayName: 'To',              width: '60'}
                        ]
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
                    lodash.assign(ctrl.gridOptions, ctrl.options || {} );
                    //
                    gridService.doWhatEverIWant();

                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
})();
