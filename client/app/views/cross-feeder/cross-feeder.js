(function () {
    'use strict';

    angular.module('meanApp')
        .factory('crossFeederParams', function () {
            return {
                query: '',
                cell_fields: ['location'],
                page: 0,
                page_size: -1,
                // start_time: startDate,
                // end_time: endDate,
                order: ['-timestamp'],
                include_total: true
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
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="grid.appScope.ctrl.methods.someFunc(row.entity)">{{grid.appScope|json}} me</a></div>'
            };
            var payments = {
                displayName: 'payments',
                field: 'payments',
                sortable: true,
                width: 55,
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="grid.appScope.ctrl.methods.goToPayments(row.entity)">{{grid.appScope|json}} me</a></div>'
            };
            var sortOptions = {
                fields: ['created_on'],
                directions: ['desc']
            };

            return GridConfigFactory('Cross Feeders', defaultColDefs.concat(parametersChanged, payments), sortOptions);

        })
        .service('crossFeederApi', function ($http, spinnerService, lodash) {
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
                    .then(function (response) {
                        return lodash.map(response, function (val) {
                            return {
                                'Id': val.id, // can not do ID
                                Age: val.age,
                                City: val.address.city,
                                Email: val.email,
                                Friends: val.friends[0].name
                            };
                        })
                    })
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
                console.log('params', params);

                spinnerService.show();
                return $http.get(url)
                    .then(splitDataToDataAndCount)
                    .catch(handleRequestFailure)
                    .finally(spinnerHide);
            };
            this.getByPage = getByPage;
            this.requestAllDataForCsv = requestAllDataForCsv;

        })
        .controller('CrossFeederCtrl', function (gridData, crossFeederApi, paginationService, $state) {
            var ctrl = this;
            // init by resolve
            ctrl.gridData = gridData;

            function getByPage(page) {
                return crossFeederApi.getByPage(page)
                    .then(function (response) {
                        ctrl.gridData = response;
                    });
            }

            paginationService.setCallback(getByPage);

            // passing methods to grid controller
            ctrl.methods = {
                someFunc: function (item) {
                    console.log('item', item);
                },
                goToPayments: function () {
                    $state.go('payments');
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
        })
        .config(function ($stateProvider) {
            $stateProvider
                .state('cross-feeder', {
                    url: '/cross-feeder',
                    templateUrl: 'app/views/cross-feeder/cross-feeder.html',
                    controller: 'CrossFeederCtrl',
                    controllerAs: 'ctrl',
                    resolve: {
                        gridData: function (crossFeederApi, crossFeederParams, gridService, crossFeederGridConfig, paginationService, csvService, qsonGridService) {
                            return crossFeederApi.getFullData(crossFeederParams)
                                .then(function (response) {
                                    qsonGridService.setName(crossFeederGridConfig.title);
                                    gridService.setConfig(crossFeederGridConfig);
                                    paginationService.setTotalCount(response.count);
                                    csvService.setCallback(crossFeederApi.requestAllDataForCsv);
                                    csvService.setFileName('cross_feederr');
                                    // get with page 1 for init the view
                                    // return new promise, just for show
                                    return crossFeederApi.getByPage(1)
                                        .then(function (response) {
                                            return response;
                                        });
                                });
                        }
                    }
                });
        });
})();
