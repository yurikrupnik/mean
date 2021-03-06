'use strict';

angular.module('meanApp')
    .factory('paymentsParams', function (pagingDropdownOptions) {

        function setParams(a) {
            params = lodash.assign({}, params, a);
        }

        function getParams() {
            return params;
        }

        var selected = pagingDropdownOptions.getSelected();

        var params = {
            page: 1, // number of pagination page, init with 1
            limit: selected.value // how many to get per call - csv and pagination grid
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
            // {displayName: 'index', field: 'index'},
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
    .factory('paymentsApi', function ($resource, spinnerService, paymentsParams, pagingDropdownOptions, lodash, CSVService) {
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

        CSVService.setResource(Payment, 'post');

        function getCount() {
            spinnerService.show();
            return Payment.get().$promise.finally(res => spinnerService.hide());
        }

        function getByPage(page) {
            spinnerService.show();
            var params = paymentsParams.getParams();
            params.limit = pagingDropdownOptions.getSelected().value;
            params.page = page;
            return Payment.post(params).$promise.finally(res => spinnerService.hide());
        }

        function csv() {
            var params = paymentsParams.getParams();
            params.csv = true;

            function handleCSV(response) {
                return lodash.map(response, function (val) {
                    return {
                        Index: val.index,
                        Name: val.name
                    }
                });
            }

            return CSVService.createPromise(params).then(handleCSV);
        }

        return {
            getCount: getCount,
            getByPage: getByPage,
            csv: csv
        };
    })
    .run(function (paymentsApi, gridService, paymentsGridConfig, paginationService, csvService) {
        paymentsApi.getCount().then(function (response) {
            // paginationService.setTotalCount(response.count);
            paginationService.setTotalCount(100);
        });
        gridService.setConfig(paymentsGridConfig);
        csvService.setFileName('payments');
        csvService.setCallback(paymentsApi.csv);
    })
    .controller('PaymentsCtrl', function (paymentsApi, paginationService, $state) {
        var ctrl = this;
        // init by resolve
        ctrl.gridData = [];

        paymentsApi.getByPage(1)
            .then(function (resp) {
                ctrl.gridData = resp.data;
            });

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
                $state.go('about');
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
                controllerAs: 'ctrl'
            });
    });
