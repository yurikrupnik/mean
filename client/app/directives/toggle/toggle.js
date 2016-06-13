(function() {
    'use strict';

    angular
        .module('toggleDirective', ['ngLodash'])
        .service('toggleService', function (lodash, $log) {
            var isBoolean = lodash.isBoolean;
            var reduce = lodash.reduce;
            var split = lodash.split;
            var trim = lodash.trim;

            function WarnFromScope(arr) {
                if (arr.length <= 1) {
                    // make sure u use vm, props.length === 0 is when u work on $scope
                    $log.warn('not using vm');
                }
            }

            function splitByDot(string) { // todo spinner also has that func
                return split(string, '.');
            }

            // reduce iters
            function toggleBool(obj, currentValue) {
                // toggles bool property when the val of currentVal with the reduced object, is bool^.
                var nextKey = trim(currentValue);
                var isValueBoolean = isBoolean(obj[nextKey]);
                if (isValueBoolean) {
                    obj[nextKey] = !obj[nextKey];
                }
                return obj[nextKey];
            }

            // method used in link function
            this.toggleStateOnObject = function(initialState, stringOfProps) {
                var props = splitByDot(stringOfProps);
                WarnFromScope(props);
                reduce(props, toggleBool, initialState);
            };
        })
        .directive('toggleState', function (toggleService) {
            return {
                restrict: 'A',
                link: linkFunc
            };

            function linkFunc(scope, el, attr) {
                el.on('click', function () {
                    scope.$apply(function () {
                        toggleService.toggleStateOnObject(scope, attr.toggleState)
                    })
                });
            }
        });
    
})();
