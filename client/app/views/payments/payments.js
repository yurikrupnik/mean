'use strict';

angular.module('meanApp')
    .factory('paymentsParams', function () {
        return {
            page: 1,
            limit: 1000,
            include_total: true
            // query: '',
            // cell_fields: ['location'],
            // page: 0,
            // page_size: -1,
            // // start_time: startDate,
            // // end_time: endDate,
            // order: ['-timestamp'],
        }
    })
    .factory('paymentsGridConfig', function (GridConfigFactory) {
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
    .factory('paymentsApi', function ($resource, spinnerService, paymentsParams) {
        var url = '/api/payments';
        var defaultParams = {
            // isArray: false,
            // method: 'GET'
        };
        var actions = {
            get: {
            //     method: 'GET',
            //     isArray: false
            },
            post: {
                // method: 'POST',
                // isArray: false
            }
        };

        var Payment = $resource(url, defaultParams, actions);


        function getAll() {
            return Payment.get(paymentsParams).$promise;
        }

        function getCount() {
            return Payment.post(paymentsParams).$promise;
        }

        function getByPage() {

        }
        return {
            getAll: getAll,
            getCount: getCount,
            getByPage: getByPage
        };

        // this.findById = function (model) {
        //     return Payment.get({id: model._id, page: 1});
        // };
        //
        //
        // this.new = function () {
        //     return new Payment();
        // }


    })
    .controller('PaymentsCtrl', function (gridData, paymentsApi, paginationService, $state) {
        var ctrl = this;
        // init by resolve
        ctrl.gridData = gridData;


        // function getByPage(page) {
        //     return paymentsApi.getByPage(page)
        //         .then(function (response) {
        //             ctrl.gridData = response;
        //         });
        // }

        // paginationService.setCallback(getByPage);

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
                    gridData: function (paymentsApi, paginationService) {
                        return paymentsApi.getAll()
                            .then(function (response) {
                                paginationService.setTotalCount(response.count);

                                return response.data;

                                // return paymentsApi.getAll().then(function (res) {
                                //     return res;
                                // })
                            });
                //         debugger;
                //         return paymentsApi.getAll()
                //             .then(function (response) {
                //     //             // qsonGridService.setName(crossFeederGridConfig.title);
                //     //             // gridService.setConfig(crossFeederGridConfig);
                //     //             console.log('response', response);
                //     //
                //     //             paginationService.setTotalCount(response.count);
                //     //             // csvService.setCallback(crossFeederApi.requestAllDataForCsv);
                //     //             // csvService.setFileName('cross_feederr');
                //     //             // // get with page 1 for init the view
                //     //             // // return new promise, just for show
                //     //             // return crossFeederApi.getByPage(1)
                //     //             //     .then(function (response) {
                //     //             //         return response;
                //     //             //     });
                //     //             return response.data;
                //             });
                    }
                }
            });
    });
