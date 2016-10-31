(function () {
    angular.module('datepicker', [])
        .factory('dateFactory', function () {
            // var dateList = {};
            // return {
            //     register: function (id) {
            //         if (!_.has(dateList, id)) {
            //             dateList[id] = {
            //                 currDate: moment().toDate(),
            //                 start: moment().subtract(1, 'days').toDate(),
            //                 end: moment().toDate()
            //             }
            //         }
            //     },
            //     dates: dateList
            // };


            var dateConfig = {
                today: moment().toDate(),
                yesterday: moment().subtract(1, 'days').toDate(),
            };


            function getYesterday() {
                return dateConfig.yesterday;
            }

            function getToday() {
                return dateConfig.today;
            }

            return {
                dates: {
                    start: getYesterday(),
                    end: getToday()
                },
                getToday: getToday,
                getYesterday: getYesterday
            }



        })
        .controller('datepickerCtrl', function ($scope, dateFactory) {

            var ctrl = this;
ctrl.fu = dateFactory;

            ctrl.dates = {
                start: {
                    date: dateFactory.dates.start, //moment().subtract(1, 'days').toDate(), // set start date to yesterday
                    isOpen: false,
                    // toggle: function () {
                        // ctrl.dates.start.isOpen = !ctrl.dates.start.isOpen;
                    // }
                },
                end: {
                    date: dateFactory.dates.end,
                    isOpen: false,
                    // toggle: function () {
                        // ctrl.dates.end.isOpen = !ctrl.dates.end.isOpen;
                    // }
                }
            };

            ctrl.options = function() {
                return {
                    // md-min-date="ctrl.dates1.start" md-max-date="ctrl.dates1.currDate"
                    maxDate: ctrl.fu.dates.end,
                    minDate: ctrl.fu.dates.start
                };
            };

            ctrl.params = function() {
                var self = this;
                self.start = dateFactory.dates.start;
                self.end = dateFactory.dates.end;
                self.options = {
                    minDate: self.start,
                    maxDate: dateFactory.getToday()
                };
                return self;
            };



        })
        .directive('qsonDatepicker', function () {
            return {
                restrict: 'E',
                scope: {
                    model: '='
                },
                templateUrl: 'app/directives/datepicker/datepicker.html',
                controller: 'datepickerCtrl',
                controllerAs: 'ctrl',
            }
        });
})();
