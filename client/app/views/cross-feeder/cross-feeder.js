'use strict';

angular.module('meanApp')
    .service('crossFeederApi', function ($http, spinnerService, gridService) {
        var url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json';

        function spinnerHide() {
            spinnerService.hide();
        }

        function splitDataToDataAndCount(data) {
            return {
                data: data.data,
                count: data.data.length
            }
        }

        function handleRequestFailure(err) {
            console.error('erroro', err);
        }

        // csv
        function returnGridData(response) {
            return response.data;
        }
        function requestAllDataForCsv() { // we just return data to create the csv, can manipulate first ofc
            spinnerService.show();
            return $http.get(url)
                .then(splitDataToDataAndCount)
                .then(returnGridData)
                .catch(handleRequestFailure)
                .finally(spinnerHide);
        }

        function getByPage(page) {
            spinnerService.show();
            return $http.get(url)
                .then(function (response) {
                    var data = response.data;
                    var filteredData;
                    switch (page) {
                        case 1:
                        {
                            filteredData = data.slice(0, 100);
                            break;
                        }
                        case 2:
                        {
                            filteredData = data.slice(100, 200);
                            break;
                        }
                        case 3:
                        {
                            filteredData = data.slice(200, 300);
                            break;
                        }
                        case 4:
                        {
                            filteredData = data.slice(300, 400);
                            break;
                        }
                        case 5:
                        {
                            filteredData = data.slice(400, 500);
                            break;
                        }
                    }
                    // gridService.setData(filteredData);
                    return filteredData;

                })
                .catch(handleRequestFailure)
                .finally(spinnerHide);
        }

        this.getFullData = function (params) {
            spinnerService.show();
            return $http.get(url)
                .then(splitDataToDataAndCount)
                .catch(handleRequestFailure)
                .finally(spinnerHide);
        };
        this.getByPage = getByPage;
        this.requestAllDataForCsv = requestAllDataForCsv;

    })
    .factory('crossFeederParams', function () {
        return {
            page: 1,
            include_total: true
        }
    })
    .controller('CrossFeederCtrl', function (gridData, crossFeederApi, paginationService) {
        var ctrl = this;

        // init by resolve
        ctrl.gridData = gridData;

        function getByPage(page) {
            return crossFeederApi.getByPage(page)
                .then(function (data) {
                    ctrl.gridData = data;
                })
        }
        paginationService.setCallback(getByPage);

        ctrl.methods = {
            someFuck: function (item) {
                console.log('item', item);

            }
        }

    })
    .factory('crossFeederGridConfig', function (GridConfigFactory) {
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
            cellTemplate: '<div class="ngCellText"><a href="" ng-click="grid.appScope.ctrl.methods.someFuck(row.entity)">{{grid.appScope|json}} me</a></div>'
        };

        var sortOptions = {
            fields: ['created_on'],
            directions: ['desc']
        };

        return GridConfigFactory('User Activities', defaultColDefs.concat(parametersChanged), sortOptions)

    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('cross-feeder', {
                url: '/cross-feeder',
                templateUrl: 'app/views/cross-feeder/cross-feeder.html',
                controller: 'CrossFeederCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    gridData: function (crossFeederApi, crossFeederParams, gridService, paginationService, csvService, crossFeederGridConfig) {
                        return crossFeederApi.getFullData(crossFeederParams)
                            .then(function (response) {
                                gridService.setConfig(crossFeederGridConfig);
                                paginationService.setTotalCount(response.count);
                                csvService.setCallback(crossFeederApi.requestAllDataForCsv);
                                csvService.setFileName('cross_feeder_report');
                                // get with page 1 for init the view
                                return crossFeederApi.getByPage(1).then(function (response) {
                                    return response;
                                });
                            });
                    }
                }
            });
    });
