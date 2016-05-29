(function () {

    'use strict';

    function AboutController(api) {

        var ctrl = this;
        function setGridDataAndCount(response) { // set to current ctrl.grid.gridData and count by binding this func
            this.grid = {
                gridData:response.data,
                count: response.count
            };
            // ctrl.grid.gridData = response.data;
            // ctrl.grid.count = response.count;
        }

        function setGridData(response) {
            ctrl.grid.gridData = response;
            // return ctrl.grid.gridData = response;
        }

        function returnGridData(response) { // just return the data for csv creation
            return response.data;
        }

        // get all for csv
        function requestAllDataForCsv() { // we just return data to create the csv, can manipulate first ofc
            return api.getFullData().then(returnGridData); // can manipulate the data before returning by more then()
        }

        // get by page
        function getDataByPage(page) {
            return api.getByPage(page)
                .then(function (response) {
                    return response.concat([]);
                })
                .then(setGridData);
        }

        function getFullDataPageInit(scope) {
            return api.getFullData().then(setGridDataAndCount.bind(scope)); // set
        }

        // get all - call on init
        // api.getFullData().then(setGridDataAndCount);
        getFullDataPageInit(ctrl);
        var itemsPerPage = 100; // todo make a directory with dropdown already built in

        var options = { // use grid service for options
            columnDefs: [{field: 'id', displayName: 'id'}, {field: 'name', displayName: 'name'}]
        };

        // this is how the ctrl of the grids should look like, the options,
        // api and methods all taken from services.. each grid with his own data manipulation and api
        ctrl.grid = {
            itemsPerPage: itemsPerPage,
            options: options,
            methods: {}
        };

        ctrl.api = { // those 2 must be made for qson-grid to work proper
            getDataByPage: getDataByPage,
            csv: requestAllDataForCsv
        }

    }



    angular.module('meanApp')
        .factory('GridConfigFactory', function () {
            function GridConfigConstructor(title, colDefs, sortInfo) {
                this.gridTitle = title || '';
                this.colDefs = colDefs || [];
                this.sortOptions = sortInfo || {};
                // this.enableDownloadCsv = true;
                // this.autoLoad = true;
                // this.useExternalSorting = sortInfo.useExternalSorting || false;
                // this.useExternalPagination = sortInfo.useExternalPagination || false;
            }

            return function (title, colDefs, sortOptions) {
                return new GridConfigConstructor(title, colDefs, sortOptions)
            }
        })
        .factory('userActivitiesGridService', function (GridConfigFactory) {
            var defaultColDefs = [
                {displayName: 'id', field: 'id'},
                {displayName: 'data_center', field: 'data_center'},
                {displayName: 'object_type', field: 'object_type'}
            ];

            var parametersChanged = {
                displayName: 'parameters',
                field: 'parameters',
                sortable: true,
                width: 55,
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="gMethods.openModal(row.entity);"><i class="fa fa-angle-double-left fa-2"></i></a></div>'
            };

            var sortOptions = {
                fields: ['created_on'],
                directions: ['desc']
            };

            return {
                gridConfig: GridConfigFactory('User Activities', defaultColDefs.concat(parametersChanged), sortOptions)
            };

        })
        .controller('AboutCtrl', AboutController)
        .directive('about', function () {
            return {
                templateUrl: 'app/views/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'ctrl'
            }
        });


})();
