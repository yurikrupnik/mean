'use strict';

angular.module('meanApp')
    .factory('paymentsParams', function (pagingDropdownOptions, lodash) {

        function setParams(a) {
            params = lodash.assign(params, a);
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
    .factory('paymentsApi', function ($resource, spinnerService, paymentsParams, pagingDropdownOptions, lodash, $q) {
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
            spinnerService.show();
            return Payment.get().$promise.finally(res => spinnerService.hide());
        }

        function getByPage(page) {
            spinnerService.show();
            var selected = pagingDropdownOptions.getSelected();
            var params = paymentsParams.getParams();
            params.page = page;
            params.limit = selected.value;
            return Payment.post(params).$promise.finally(res => spinnerService.hide());
        }


        function getData(object) {
            return object.data;
        }

        function getDataOfResponses(responses) {
            return lodash.map(responses, getData);
        }

        function flattenResponses(responses) {
            // responses = [ [{},{}...], [], []]
            return lodash.flatten(getDataOfResponses(responses));
        }


        function createArrayOfPromises(totalCount, params) {
            // params.page_size = 10000; // objects in single page
            var cap = Math.ceil(totalCount / params.limit); // amount of pages needed to fetch all the data for scv
            var pages = lodash.range(0, cap);

            function createPromise(page) {
                // params.page = page;
                return Payment.post(lodash.assign(params, {page: page})).$promise;
            }

            console.log('pages.length', pages.length);

            return lodash.map(pages, function(page) { // create array of needed api calls to fetch the data for scv
                return function (p) {
                    var current = p + 1;
                    console.log('current', current);

                    // current gets last = closure does not work for me here
                    return createPromise(current);
                }(page);
            });
        }

        function csv() {


            var params = paymentsParams.getParams();
            params.limit = 1000;
            params.csv = true;

            var totalCount = 3000; // todo get it out maybe?

            // var promises = createArrayOfPromises(totalCount, lodash.assign({}, params));

            var promises = [
                Payment.post({csv: true, limit: 1000, page: 1}).$promise,
                Payment.post({csv: true, limit: 1000, page: 2}).$promise,
                Payment.post({csv: true, limit: 1000, page: 3}).$promise,
                // Payment.post({csv: true, limit: 1000, page: 4}).$promise,
                // Payment.post({csv: true, limit: 1000, page: 5}).$promise
            ];


            spinnerService.show();
            return $q.all(promises)
                .then((responseArray) => {
                    return flattenResponses(responseArray);
                })
                .then(function (response) {
                    return lodash.map(response, function (val) {
                        return {
                            Index: val.index,
                            Name: val.name
                        };
                    });
                })
                .finally(res => spinnerService.hide());
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
                controllerAs: 'ctrl',
                resolve: {
                    data: function (paymentsApi, gridService, paymentsGridConfig, paymentsParams, paginationService, csvService) {
                        return paymentsApi.getCount()
                            .then((response) => {
                                gridService.setConfig(paymentsGridConfig);
                                // sonGridService.setName(paymentsGridConfig.title); // failing all route
                                // paymentsParams.setParams({count: response.count});
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
