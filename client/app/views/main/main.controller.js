'use strict';


class MainController {

    constructor(socket, spinnerService, lodash, Thing) {

        function callback(data) {
            console.log('data', data);

        }

        this.socket = socket;
        this.awesomeThings = Thing.all();
        this.lodash = lodash;
        this.spinnerService = spinnerService;
        this.Thing = Thing;
        this.newThing = Thing.new();

        // $scope.$on('$destroy', function () {
        //     socket.unsyncUpdates('thing');
        // });
    }

    $onInit() {
        // this.spinnerService.show();
        // this.Thing.all((data) => {
        //     console.log('data', data);
        //
        //     this.awesomeThings = data;
        //     this.socket.syncUpdates('thing', this.awesomeThings);
        //     this.spinnerService.hide();
        // });
        // this.$http.get('/api/things').then(response => {
        //     this.awesomeThings = response.data;
        //     this.socket.syncUpdates('thing', this.awesomeThings);
        //     this.spinnerService.hide();
        // });

        // this.$http.get('/api/payments').then(res => {
        //     this.payments = res.data;
        // })
    }

    addThing(model) {
        if (model.name) {
            model.$save();
            this.socket.syncUpdates('thing', this.awesomeThings);
            // this.$http.post('/api/things', {name: this.newThing});
            this.newThing = this.Thing.new();
        }
    }

    deleteThing(thing) {
        // thing.$delete({id: thing._id});
        this.Thing.$delete({id: thing._id});

        // this.awesomeThings = this.Thing.all();
        // this.socket.syncUpdates('thing', this.awesomeThings);
        // this.$http.delete('/api/things/' + thing._id);
    }
}
// function mainController(socket, Thing) {
//     var ctrl = this;
//     // ctrl.credits = Credit.all();
//     ctrl.awesomeThings = Thing.all();
//     ctrl.newThing = Thing.new();
//
//     ctrl.addThing = function () {
//         if (!ctrl.newThing.name) {return}
//         ctrl.newThing.$save();
//         ctrl.newThing = Thing.new();
//
//         socket.syncUpdates('thing', ctrl.awesomeThings); // socekt updates the model,
//     };
//
//     ctrl.deleteThing = function(thing) {
//         thing.$delete({id: thing._id});
//         socket.syncUpdates('thing', ctrl.awesomeThings); // socekt updates the model,
//     };
//
//     ctrl.getOne = function (thing) { // and update
//         ctrl.one = Thing.one(thing);
//     }
// }
angular.module('meanApp')
    .component('main', {
        templateUrl: 'app/views/main/main.html',
        controller: MainController
    });

