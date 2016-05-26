"use strict";

class PaymentsComponent {
    constructor(payments) {
        this.message = 'Hello';
        this.hidden = true;
        // this.payments = payments;
        this.payments = payments.findAll();
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

        this.findAll = function () {
            return Payment.query();
        };

        this.new = function () {
            return new Payment();
        }

    })
    .component('payments', {
        templateUrl: 'app/views/payments/payments.html',
        controller: PaymentsComponent
    });
