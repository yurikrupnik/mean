(function () {

    'use strict';


    angular.module('meanApp')
        .factory('GridConfigFactory', function () {
            function GridConfigConstructor(title, columnDefs, sortInfo) {
                this.title = title || '';
                this.columnDefs = columnDefs || [];
                // this.sortOptions = sortInfo || {};
                // this.enableDownloadCsv = true;
                // this.autoLoad = true;
                // this.useExternalSorting = sortInfo.useExternalSorting || false;
                // this.useExternalPagination = sortInfo.useExternalPagination || false;
            }

            return function (title, colDefs, sortOptions) {
                return new GridConfigConstructor(title, colDefs, sortOptions)
            }
        })
        .factory('userActivitiesGridConfig', function (GridConfigFactory) {
            var defaultColDefs = [
                {displayName: 'id', field: 'id'},
                {displayName: 'age', field: 'age'},
                {displayName: 'gender', field: 'gender'}
            ];
            var parametersChanged = {
                displayName: 'par',
                field: 'parameters',
                sortable: true,
                width: 55,
                cellTemplate: '<div class="ngCellText"><a href="" ng-click="grid.appScope.ctrl.methods.someFuck(row.entity)">click me</a></div>'
            };

            var sortOptions = {
                fields: ['created_on'],
                directions: ['desc']
            };

            return GridConfigFactory('User Activities', defaultColDefs.concat(parametersChanged), sortOptions)

        })
        .controller('AboutCtrl', AboutController)
        .directive('about', function () {
            return {
                templateUrl: 'app/views/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'ctrl',
                bindToController: true,
                scope: {}
            }
        });

    function AboutController(lodash) {

        var ctrl = this;

        ctrl.dates = {
            start: {
                date: new Date(), //  moment().subtract(1, 'days').format('YYYY-MM-DD'), // set start date to yesterday
                isOpen: false
            },
            end: {
                date: new Date(),
                isOpen: false,
                maxDate: moment().format('YYYY-MM-DD')
            }
        };


        ctrl.selectedQuery = [];

        function handleQueryBuild() {

            ctrl.query = ctrl.selectedQuery.map(function (val, index) {
                return val.map(function (value) {
                    return value && value.value || value; // value in an object or a string
                }).join(' ');

            }).join(' ');

            console.log('ctrl.query', ctrl.query);

        }


        ctrl.handleQueryBuild = handleQueryBuild;
    }


})();
