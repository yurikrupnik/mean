(function () {
    "use strict";




    function paymentController(userActivitiesGridConfig, lodash, csvService) {

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
            // set the name of the csv file
            return lodash.map(response, function (item) {
                // this is the structure of the csv file
                return {
                    Id: item.id,
                    Name: item.name,
                    Picture: item.picture,
                    Email: item.email,
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

        csvService.setFileName('payment');
        csvService.setCallback(requestAllDataForCsv);

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
        .service('payments', function ($resource) {

            var url = '/api/payments/:id';
            var defaultParams = {id: '@id'};
            var actions = {
                update: {
                    method: 'PUT',
                    params: {
                        id: '@id'
                    }
                }
            };

            var Payment = $resource(url, defaultParams, actions);


            this.findById = function (model) {
                return Payment.get({id: model._id});
            };

            this.findAll = function (cb) {
                return Payment.query(cb);
            };

            this.new = function () {
                return new Payment();
            }

        })
        .directive('payments', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/views/payments/payments.html',
                // scope: true,
                // controller: paymentController,
                // controllerAs: 'ctrl',
                // bindToController: true
            }
        });

})();
