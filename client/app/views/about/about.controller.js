(function () {

    'use strict';



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
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="grid.appScope.ctrl.methods.someFuck(row.entity)">click me</a></div>'
            };

            var sortOptions = {
                fields: ['created_on'],
                directions: ['desc']
            };

            return GridConfigFactory('User Activities', defaultColDefs.concat(parametersChanged), sortOptions)

        })
        // .controller('AboutCtrl', AboutController)
        .directive('about', function () {
            return {
                templateUrl: 'app/views/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'ctrl',
                bindToController: true,
                scope: {}
            }
        });

    // function AboutController($scope, api, userActivitiesGridConfig, lodash, csvService, paginationService, gridService, data) {
    //
    //     var ctrl = this;
    //
    //     console.log('data', data);
    //
    //
    //     function setGridData(response) {
    //         gridService.setData(response);
    //         // $scope.$apply();
    //     }
    //
    //     function returnGridData(response) { // just return the data for csv creation
    //         return response.data;
    //     }
    //
    //     function buildCsvHeaders(response) {
    //         return lodash.map(response, function (item) {
    //             // this is the structure of the csv file
    //             return {
    //                 Id: item.id,
    //                 Age: item.age,
    //                 Gender: item.gender,
    //                 Guid: item.guid,
    //                 Active: item.isActive
    //             }
    //         })
    //     }
    //     // get all for csv
    //     function requestAllDataForCsv() { // we just return data to create the csv, can manipulate first ofc
    //         return api.getFullData()
    //             .then(returnGridData)
    //             .then(buildCsvHeaders)
    //     }
    //
    //     // get by page
    //     function getDataByPage(page) {
    //         return api.getByPage(page)
    //             .then(setGridData);
    //     }
    //
    //     function setGridDataAndCount(response) {
    //         paginationService.setTotalCount(response.count);
    //         gridService.setData(response.data);
    //     }
    //
    //     function getFullDataPageInit(params) {
    //         return api.getFullData(params).then(setGridDataAndCount);
    //     }
    //
    //
    //     getFullDataPageInit({});
    //
    //     // set csv name and callback
    //     csvService.setFileName('about_csv');
    //     csvService.setCallback(requestAllDataForCsv);
    //
    //
    //     // set grid name and structure
    //     paginationService.setCallback(getDataByPage);
    //     // gridService.
    //
    //
    //
    //     ctrl.grid = {
    //         // options: userActivitiesGridConfig, // options of the grid
    //         // methods: { // methods for grid cellTemplates
    //         //     someFuck: function() {
    //         //         console.log('doing what ever i want');
    //         //     },
    //         //     yebal: function () {
    //         //         console.log('tablas');
    //         //     }
    //         // }
    //     };
    //
    //
    //     ctrl.dates = {
    //         start: {
    //             date: new Date(), //  moment().subtract(1, 'days').format('YYYY-MM-DD'), // set start date to yesterday
    //             isOpen: false
    //         },
    //         end: {
    //             date: new Date(),
    //             isOpen: false,
    //             maxDate: moment().format('YYYY-MM-DD')
    //         }
    //     };
    // }


})();
