(function () {
    'use strict';

    function link(scope, element, attrs) {
        var ctrl = scope.ctrl, title, prop, placeholder;
        if ('title' in attrs) {
            title = attrs.title;
        }
        if ('prop' in attrs) {
            prop = attrs.prop;
        }
        if ('placeholder' in attrs) {
            placeholder = attrs.placeholder;
        }
        ctrl.getTitle = function () {
            return title;
        };

        ctrl.getPlaceholder = function () {
            return placeholder;
        };
        ctrl.getProp = function () {
            return prop;
        };
    }

    angular.module('meanAppDirectives')
        .config(function (uiSelectConfig) {
            uiSelectConfig.closeOnSelect = true;
            uiSelectConfig.appendToBody = false;
            uiSelectConfig.sortable = true;
            uiSelectConfig.searchEnabled = true;
            uiSelectConfig.resetSearchInput = true;
            uiSelectConfig.theme = 'bootstrap';

            // uiSelectConfig.autofocus = false;
            // uiSelectConfig.limitTo = 2;
        })

        .directive('neDropdown', function () {
            return {
                templateUrl: 'app/directives/ne-dropdown/ne-dropdown.html',
                restrict: 'E',
                transclude: true,
                scope: {
                    model: '=',
                    items: '=',
                    callback: '<',
                    disabled: '='
                },
                bindToController: true,
                compile: function(tElement, tAttrs) {
                    return link;
                },
                controller: function () {},
                controllerAs: 'ctrl'
            };
        })
        .directive('neDropdownMulty', function () {

            return {
                templateUrl: 'app/directives/ne-dropdown/ne-dropdown-multy.html',
                restrict: 'E',
                scope: {
                    model: '=',
                    items: '=',
                    callback: '<',
                    disabled: '='
                },
                bindToController: true,
                compile: function(tElement, tAttrs) {
                    return link;
                },
                controller: function () {},
                controllerAs: 'ctrl'
            };
        });
})();
