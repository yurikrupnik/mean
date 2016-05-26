(function () {
    'use strict';

    angular
        .module('meanAppDirectives')
        .directive('spinner', spinner)
        .value('ngHide', 'ng-hide')
        .value('spinnerEvents', [
            // todo create provider to emit new spinner events
            // eventName = /*controller action, jquery action to do on the dom
            ['spinner.show', 'removeClass'],
            ['spinner.hide', 'addClass']
        ])
        // /** @ngInject */
        .factory('spinnerUtils', spinnerUtils)
        .service('spinnerService', spinnerService);

    /** @ngInject */
    function spinnerUtils($rootScope, lodash, spinnerEvents, ngHide) {
        function splitByDon(string) {
            return lodash.split(string, '.');
        }

        function getEventName(string) {
            return lodash.head(string);
        }

        function getJqueryEvent(string) {
            return lodash.last(string)
        }

        function getControllerAction(string) {
            // in a chain of dotted strings, last one
            return lodash.last(splitByDon(string));
        }

        function registerControllerActions(current, newValue) {
            var eventName = getEventName(newValue);
            var controllerAction = getControllerAction(eventName);
            current[controllerAction] = function () { // now i can use spinnerService.hide() / .show() and broadcast the event name
                $rootScope.$broadcast(eventName);
            };
            return current; // return controller
        }

        function registerEventOnSpinnerScope(scope, element) {
            // register on the scope dynamic events made from your spinnerEvents array
            lodash.forEach(spinnerEvents, function (value) {
                var event = getEventName(value);
                var action = getJqueryEvent(value);
                scope.$on(event, function (e) {
                    element[action](ngHide);
                });
            });

            // // same as that part - but not dynamic
            // scope.$on('spinner.show', function (e) {
            //     element.removeClass(ngHide);
            // });
        }

        return {
            registerControllerActions: registerControllerActions,
            registerEventOnSpinnerScope: registerEventOnSpinnerScope
        }
    }

    /** @ngInject */
    function spinner(ngHide, spinnerUtils) {

        function compile(tElement) {
            // adds built in angular class for hiding element on compile
            tElement.addClass(ngHide);
            // returning link function
            return spinnerUtils.registerEventOnSpinnerScope
        }

        return {
            restrict: 'E',
            templateUrl: 'app/directives/spinner/spinner.html',
            compile: compile
        };
    }

    /** @ngInject */
    function spinnerService(spinnerEvents, lodash, spinnerUtils) {
        lodash.reduce(spinnerEvents, function (currentValue, newValue) {
            return spinnerUtils.registerControllerActions(currentValue, newValue);
        }, this);
    }
})();
