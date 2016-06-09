(function () {
    "use strict";

    function qsonGridController(qsonGridService) {
        var ctrl = this;

        ctrl.name = qsonGridService.getName();
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
        .service('qsonGridService', function (lodash) {
            var name = '';

            function setName(str) {
                name = lodash.isString(str) ? str : '';
            }

            function getName() {
                return name;
            }

            this.setName = setName;
            this.getName = getName;
        })
        .directive('qsonGrid', qsonGridDirective);
})();
