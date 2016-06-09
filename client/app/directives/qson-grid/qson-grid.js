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
                gridData: '=',
                methods: '<'
            },
            controller: qsonGridController,
            controllerAs: 'ctrl',
            bindToController: true
        }
    }

    angular.module('qson.grid', [])
        .directive('qsonGrid', qsonGridDirective);
})();
