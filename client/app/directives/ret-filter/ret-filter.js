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
        .controller('retFilterCtrl', function (SINGLEOPERATIONS, GENERAL, OPERATIONS) {
            var ctrl = this;

            ctrl.SINGLEOPERATIONS = SINGLEOPERATIONS;
            ctrl.GENERAL = GENERAL;
            ctrl.OPERATIONS = OPERATIONS;

            // set on model the selected values
            var initModel = [
                '',
                GENERAL[0],
                OPERATIONS[0],
                ''
            ];
            var newModel = [
                SINGLEOPERATIONS[0],
                GENERAL[0],
                OPERATIONS[0],
                ''
            ];

            // must copy the model to solve scope problem
            function setModel(model) {
                return angular.copy(model)
            }

            // init the first row
            ctrl.rows[0] = setModel(initModel);

            ctrl.addRow = function () {
                ctrl.rows.push(setModel(newModel));
            };

            ctrl.removeRow = function (index) {
                ctrl.rows.splice(index, 1);
            };
        })
        .directive('retFilter', function (lodash) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/ret-filter/ret-filter.html',
                scope: {
                    rows: '='
                },
                controller: 'retFilterCtrl',
                bindToController: true,
                controllerAs: 'ctrl'
            }
        });
})();
