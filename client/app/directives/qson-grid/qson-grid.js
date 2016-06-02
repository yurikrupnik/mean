(function () {
    angular.module('qson.grid', [])
        .controller('somemodalctrl', function ($modalInstance, parameters) {
            var ctrl = this;
            ctrl.parameters = parameters;

            ctrl.ok = function () {
                $modalInstance.close('cancel');
            };
        })
        .directive('qsonGrid', function (pagingDropdownOptions) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/qson-grid/qson-grid.html',
                scope: {
                    options: '=',
                    api: '<'
                },
                controller: function () {
                    var ctrl = this;
                },
                controllerAs: 'ctrl',
                bindToController: true
            }
        });
})();
