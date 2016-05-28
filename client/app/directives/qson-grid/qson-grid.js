(function () {
    angular.module('qson.grid', [])
        .directive('qsonGrid', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/qson-grid/qson-grid.html'
            }
        });
})();
