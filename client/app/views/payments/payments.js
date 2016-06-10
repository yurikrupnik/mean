'use strict';

angular.module('meanApp')
    .factory('paymentsParams', function (lodash) {

        function setParams(a) {
            params = lodash.assign(params, a);
        }

        function getParams() {
            return params;
        }

        var params = {
            page: 1, // number of pagination page, init with 1
            limit: 100 // how many to get per call - csv and pagination grid
            // page_size: -1,
            // include_total: false,
            // query: '',
            // cell_fields: ['location'],
            // page: 0,
            // // start_time: startDate,
            // // end_time: endDate,
            // order: ['-timestamp'],
        };


        return {
            getParams: getParams,
            setParams: setParams
        };

    })
    .factory('paymentsGridConfig', function (GridConfigFactory) {
        var defaultColDefs = [
            // {displayName: 'id', field: 'id'},
            {displayName: 'index', field: 'index'},
            {displayName: 'name', field: 'name'}
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

        return GridConfigFactory('Payments', defaultColDefs.concat(parametersChanged, payments), sortOptions);

    })
    .factory('paymentsApi', function ($resource, spinnerService, paymentsParams) {
        var url = '/api/payments';
        var defaultParams = {
            // isArray: false,
            // method: 'GET'
        };
        var actions = {
            get: {
                method: 'GET',
                isArray: false
            },
            post: {
                method: 'POST',
                isArray: false
            }
        };

        var Payment = $resource(url, defaultParams, actions);

        function getCount() {
            return Payment.get().$promise;
        }

        function getByPage(page) {
            var params = paymentsParams.getParams();
            params.page = page;
            return Payment.post(params).$promise;
        }

        function csv() {
            // todo
            return Payment.post(params).$promise;
        }

        return {
            getCount: getCount,
            getByPage: getByPage,
            csv: csv
        };
    })
    .controller('PaymentsCtrl', function (data, paymentsApi, paginationService, $state) {
        var ctrl = this;
        // init by resolve
        ctrl.gridData = data;


        function getByPage(page) {
            return paymentsApi.getByPage(page)
                .then(function (response) {
                    ctrl.gridData = response.data;
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
            .state('payments', {
                url: '/payments',
                templateUrl: 'app/views/payments/payments.html',
                controller: 'PaymentsCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    data: function (paymentsApi, gridService, paymentsGridConfig, paymentsParams, paginationService, csvService) {
                        return paymentsApi.getCount()
                            .then((response) => {
                                gridService.setConfig(paymentsGridConfig);
                                // sonGridService.setName(paymentsGridConfig.title); // failing all route
                                paymentsParams.setParams({count: response.count});
                                paginationService.setTotalCount(response.count);
                                csvService.setFileName('payments');
                                csvService.setCallback(paymentsApi.csv);
                                return paymentsApi.getByPage(1)
                                    .then(function (resp) {
                                        return resp.data;
                                    })
                            });
                    }
                }
            });
    });
