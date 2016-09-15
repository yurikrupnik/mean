'use strict';


class MainController {

    constructor(socket, spinnerService, lodash, Thing) {

        // function callback(data) {
        //     console.log('data', data);
        //
        // }
        //
        //
        // this.socket = socket;
        // this.awesomeThings = Thing.all();
        // this.lodash = lodash;
        // this.spinnerService = spinnerService;
        // this.Thing = Thing;
        // this.newThing = Thing.new();
        //
        // this.items = [
        //     {name: 'yuri', text: 'yuri'},
        //     {name: 'tal', text: 'tal'},
        //     {name: 'nir', text: 'nir'}
        // ];


        var self = this;


        // this.dates = {
        //     start: {
        //         date: moment().subtract(1, 'days').format('YYYY-MM-DD'), // set start date to yesterday
        //         // isOpen: false,
        //         toggleDatePicker: toggleDatePicker(this)
        //     },
        //     end: {
        //         date: moment().format('YYYY-MM-DD'),
        //         // isOpen: false,
        //         // toggleDatePicker: toggleDatePicker(this),
        //         maxDate: moment().format('YYYY-MM-DD')
        //     }
        // };
        //
        //
        //
        //
        // this.isOpen= false;
        //
        // function toggleDatePicker(model) {
        //     debugger
        //     self.isOpen = !self.isOpen;
        // }
        //
        // this.toggleDatePicker = toggleDatePicker;
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
    .directive('shit', function () {
        return {
            restrict: 'E',
            template: '<div class="bottom-margin-15">' +
        '    <div class="form-inline">' +
        '    <div class="input-group">' +
      '      <span class="input-group-addon">Start Date</span>' +
    '    <input type="text"' +
    '    class="form-control input-sm"' +
   '     ng-model="ctrl.dates.start.date"' +
      '  date-time max-date="ctrl.options.maxDate" view="true"' +
    '    ng-required="true"' +
      '      <span class="input-group-btn">' +
       '     <button type="button" class="btn btn-default btn-sm" ng-click="ctrl.dates.start.toggleDatePicker($event)" ><i class="glyphicon glyphicon-calendar"></i></button>' +
        '    </span>' +
         '   </div>' +
          '  <div class="input-group">' +
           ' <span class="input-group-addon">End Date</span>' +
      '  <input type="text"' +
                'id="pickerToUpdate"' +
       ' ng-model="ctrl.dates.end.date"' +
            '  uib-datepicker-popup datepicker-options="ctrl.options1"' +
       ' ng-required="true"' +
       ' close-text="Close"/>' +
        '    <span class="input-group-btn">' +
        '    <button type="button" class="btn btn-default btn-sm" ng-click="ctrl.dates.end.toggleDatePicker($event)"><i class="glyphicon glyphicon-calendar"></i></button>' +
         '   </span>' +
          '  </div>' +
           ' <button class="btn btn-success btn-sm" ng-click="ctrl.refreshGrid()">Submit</button>' +
            '</div>' +
            '</div>',
            controller: function ($scope) {

                var ctrl = this;
                ctrl.dates = {
                    start: {
                        date: moment().subtract(1, 'days').toDate(), // set start date to yesterday
                        isOpen: false,
                        toggleDatePicker: function (e) {
                            e.stopPropagation();
                            ctrl.dates.start.isOpen = !ctrl.dates.start.isOpen;
                        },
                        options: {
                            // maxDate: ctrl.dates.end.maxDate
                        }
                    },
                    end: {
                        date: moment().toDate(),
                        isOpen: false,
                        toggleDatePicker: function (e) {
                            e.stopPropagation();
                            ctrl.dates.end.isOpen = !ctrl.dates.end.isOpen;
                        },
                        maxDate: moment().toDate()
                    }
                };

                ctrl.options = {
                    maxDate: moment().toDate()
                }

                ctrl.options1 = {
                    minDate: ctrl.dates.start.date,
                    maxDate: ctrl.dates.end.maxDate
                }
                $scope.$broadcast('pickerUpdate', 'pickerToUpdate', {
                    format: 'D MMM YYYY HH:mm',
                    // maxDate: maxSelectableDate, //A moment object, date object, or date/time string parsable by momentjs
                    minView: 'hours',
                    view: false //Use default
                });

            },
            controllerAs: 'ctrl',
            bindToController: true,
            scope: true
        }
    })
    .component('main', {
        templateUrl: 'app/views/main/main.html',
        controller: MainController
    });

