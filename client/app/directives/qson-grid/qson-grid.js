(function () {
    "use strict";
    
    function qsonGridController() {
        var ctrl = this;

    }

    function qsonGridDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/qson-grid/qson-grid.html',
            scope: {
                config: '='
            },
            controller: 'qsonGridController',
            controllerAs: 'ctrl',
            bindToController: true
        }
    }

    angular.module('qson.grid', [])
        .controller('qsonGridController', qsonGridController)
        .directive('qsonGrid', qsonGridDirective);
})();
