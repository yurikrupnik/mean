(function () {
    angular.module('datepicker', [])
        .controller('datepickerCtrl', function ($scope) {

            var ctrl = this; // YYYY-MM-DD

            ctrl.dates = {
                start: {
                    date: moment().subtract(1, 'days').toDate(), // set start date to yesterday
                }
            };


            ctrl.dates.end = {
                date: moment().toDate(),
                minDate: ctrl.dates.start.date
            };
        })
        .directive('qsonDatepicker', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/datepicker/datepicker.html',
                controller: 'datepickerCtrl',
                controllerAs: 'ctrl',
            }
        });
})();
