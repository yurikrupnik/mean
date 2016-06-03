(function () {

    'use strict';

    function AboutController(api, userActivitiesGridConfig, lodash, csvService) {

        var ctrl = this;

        getFullDataPageInit(ctrl);

        function setGridDataAndCount(response) { // set to current ctrl.grid.gridData and count by binding this func
            this.grid = {
                gridData: response.data,
                count: response.count
            };
        }

        function setGridData(response) {
            ctrl.grid.gridData = response;
        }

        function returnGridData(response) { // just return the data for csv creation
            return response.data;
        }

        function buildCSV(response) {
            return lodash.map(response, function (item) {
                // this is the structure of the csv file
                return {
                    Id: item.id,
                    Age: item.age,
                    Gender: item.gender,
                    Guid: item.guid,
                    Active: item.isActive
                }
            })
        }
        // get all for csv
        function requestAllDataForCsv() { // we just return data to create the csv, can manipulate first ofc
            return api.getFullData()
                .then(returnGridData)
                .then(buildCSV)
        }

        // get by page
        function getDataByPage(page) {
            return api.getByPage(page)
                .then(function (response) {
                    return response.concat([]);
                })
                .then(setGridData);
        }

        function getFullDataPageInit(scope, params) {
            return api.getFullData(params).then(setGridDataAndCount.bind(scope)); // set
        }

        ctrl.grid = {
            options: userActivitiesGridConfig, // options of the grid
            methods: { // methods for grid cellTemplates
                someFuck: function() {
                    console.log('doing what ever i want');
                },
                yebal: function () {
                    console.log('tablas');
                }
            },
            api: { // those 2 must be made for qson-grid to work proper
                getDataByPage: getDataByPage,
                csv: requestAllDataForCsv
            }
        };


        ctrl.dates = {
            start: {
                date: new Date(), //  moment().subtract(1, 'days').format('YYYY-MM-DD'), // set start date to yesterday
                isOpen: false
            },
            end: {
                date: new Date(),
                isOpen: false,
                maxDate: moment().format('YYYY-MM-DD')
            }
        };
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
        .factory('userActivitiesGridConfig', function (GridConfigFactory, csvService) {
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
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="grid.appScope.ctrl.methods.someFuck(row.entity)">click me</a></div>'
            };

            var sortOptions = {
                fields: ['created_on'],
                directions: ['desc']
            };
            csvService.setFileName('action types');

            return GridConfigFactory('User Activities', defaultColDefs.concat(parametersChanged), sortOptions)

        })
        .controller('AboutCtrl', AboutController)
        .directive('about', function () {
            return {
                templateUrl: 'app/views/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'ctrl',
                bindToController: true,
                scope: {}
            }
        });


})();
