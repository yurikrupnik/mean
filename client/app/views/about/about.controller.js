(function () {

    'use strict';

    function AboutController(api, userActivitiesGridConfig) {

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
            console.log('response', response);

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

        // options.columnDefs = [{field: 'id', displayName: 'id'}, {field: 'name', displayName: 'name'}];

        var options = userActivitiesGridConfig;

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
        ctrl.items = [{displayName: 'Timestamp', field: 'timestamp'},
            {displayName: 'Module name', field: 'object_type'},
            {displayName: 'Change Type', field: 'operation'},
            {displayName: 'Affected Objects', field: 'affected_objects'},
            {displayName: 'User', field: 'user'},
            {displayName: 'Comment', field: 'comment'}];
        

    }



    angular.module('meanApp')
        .factory('GridConfigFactory', function () {
            function GridConfigConstructor(title, columnDefs, sortInfo) {
                this.title = title || '';
                this.columnDefs = columnDefs || [];
                // this.sortOptions = sortInfo || {};
                // this.enableDownloadCsv = true;
                // this.autoLoad = true;
                // this.useExternalSorting = sortInfo.useExternalSorting || false;
                // this.useExternalPagination = sortInfo.useExternalPagination || false;
            }

            return function (title, colDefs, sortOptions) {
                return new GridConfigConstructor(title, colDefs, sortOptions)
            }
        })
        .factory('userActivitiesGridConfig', function (GridConfigFactory) {
            var defaultColDefs = [
                {displayName: 'id', field: 'id'},
                {displayName: 'age', field: 'age'},
                {displayName: 'gender', field: 'gender'}
            ];
            var parametersChanged = {
                displayName: 'par',
                field: 'parameters',
                sortable: true,
                width: 55,
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="ctrl.grid.appScope.openModal(row.entity);"><span>{{ctrl}}</span><i class="fa fa-angle-double-left fa-2"></i></a></div>'
            };

            var sortOptions = {
                fields: ['created_on'],
                directions: ['desc']
            };

            return GridConfigFactory('User Activities', defaultColDefs.concat(parametersChanged), sortOptions)

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
