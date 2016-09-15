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

            function handleQuotesByIndex(value, i) {
                if (i === 3) {
                    return "'" + value + "'";
                } else if (i === 2) {
                    // handle regex if
                }

                // handle more shit that are for

                return value && value.value || value; // value in an object or a string
            }

            function handleJoiningQueryProps(value) {
                return value.map(handleQuotesByIndex).join(' ');
            }

            function handleBrackets(v, i) {
                if (i === 0) {
                    return '(' + lodash.trim(v) + ')';
                } else {
                    var firstWord = v.substr(0, v.indexOf(" "));
                    var rest = lodash.trim(v.substr(v.indexOf(" ")));
                    return firstWord + ' ' + '(' + rest + ')';
                }
            }

            ctrl.query = lodash
                .map(ctrl.selectedQuery, handleJoiningQueryProps)
                .map(handleBrackets)
                .join(' ');

            console.log('ctrl.query', ctrl.query);

        }


        ctrl.handleQueryBuild = handleQueryBuild;
    }


})();
