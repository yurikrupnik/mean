(function () {
    angular.module('meanApp')
        .constant('GENERAL', [
            {text: 'OSS', value: 'oss'},
            {text: 'Cell IDs', value: 'cell_ids'}
        ])
        .constant('OPERATIONS', [
            {text: 'equals', value: '=='},
            {text: 'not equals', value: '!='},
            {text: 'contains', value: '=='}, // regex(\"as\", \"i\")
            {text: 'in', value: 'in'},
            {text: 'not in', value: 'not in'}
        ])
        .constant('SINGLEOPERATIONS', [
            {text: 'Or', value: 'or'},
            {text: 'And', value: 'and'}
        ])
        .directive('retFilter', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/ret-filter/ret-filter.html',
                scope: {
                    rows: '='
                },
                controller: function (SINGLEOPERATIONS, GENERAL, OPERATIONS) {
                    var ctrl = this;

                    ctrl.SINGLEOPERATIONS = SINGLEOPERATIONS;
                    ctrl.GENERAL = GENERAL;
                    ctrl.OPERATIONS = OPERATIONS;
                },
                bindToController: true,
                controllerAs: 'ctrl',
                link: function (scope, elem, attrs) {
                    var ctrl = scope.ctrl;

                    // set on model the selected values
                    var initModel = [
                        '',
                        ctrl.GENERAL[0],
                        ctrl.OPERATIONS[0],
                        ''
                    ];
                    var newModel = [
                        ctrl.SINGLEOPERATIONS[0],
                        ctrl.GENERAL[0],
                        ctrl.OPERATIONS[0],
                        ''
                    ];

                    function setModel(model) {
                        return angular.copy(model)
                    }
                    // init the first row
                    ctrl.rows[0] = setModel(initModel);

                    ctrl.addRow = function () {
                        ctrl.rows.push(setModel(newModel));
                    };

                    ctrl.removeRow = function (index) {
                        console.log('index', index);

                        ctrl.rows.splice(index, 1);
                    };

                }
            }

        });
})();
