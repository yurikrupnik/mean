"use strict";



class PaymentsComponent {
    constructor(payments, api) {
        var setGridDataAndCount = (data) => {
            this.gridData = data.data || [];
            this.totalCount = data.count || 0;
        };

        var returnGridData = (data) => data.data;

        // get all - call on init
        api.getFullData().then(setGridDataAndCount);

        // get all for csv
        // this.createCSV = function () { // we just return data to create the csv, can manipulate first ofc
        //     return api.getFullData().then(returnGridData);
        // };

        // get by page
        // this.getDataByPage = function (page) {
        //     return api.getByPage(page)
        //         .then(data => this.gridData = data);
        // };


        // this.gridOptions = {};
        // this.gridOptions.columnDefs = [{field: 'id', displayName: 'id'}, {field: 'name', displayName: 'name'}];
        //
        // this.filename = 'oss_changes';
        //
        // this.grid = {
        //     options: {},
        //     api: {},
        //     methods: {}
        // };
        // payments.findAll((data) => {
        //     this.total = 500;
        //     this.payments = data;
        // });
        this.itemsPerPage = 100;
        this.items = [
            {name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States'},
            {name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina'},
            {name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina'},
            {name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador'},
            {name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador'},
            {name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States'},
            {name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia'},
            {name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador'},
            {name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia'},
            {name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia'}
        ];
        this.total = 222;

    }
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
    .component('payments', {
        templateUrl: 'app/views/payments/payments.html',
        controller: PaymentsComponent
    });
