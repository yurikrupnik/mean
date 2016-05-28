(function () {

    'use strict';

    function AboutController(api) {

        var ctrl = this;

        function setGridDataAndCount(data) {
            ctrl.gridData = data.data;
            ctrl.totalCount = data.count;
        }

        function returnGridData(data) {
            return data.data;
        }

        // get all - call on init
        api.getFullData().then(setGridDataAndCount);

        // get all for csv
        ctrl.createCSV = function () { // we just return data to create the csv, can manipulate first ofc
            return api.getFullData().then(returnGridData);
        };

        // get by page
        ctrl.getDataByPage = function (page) {
            return api.getByPage(page)
                .then(function (data) {
                    ctrl.gridData = data;
                });
        };


        ctrl.itemsPerPage = 100;
        ctrl.gridOptions = {};
        ctrl.gridOptions.columnDefs = [{field: 'id', displayName: 'id'}, {field: 'name', displayName: 'name'}];

        ctrl.filename = 'oss_changes';

        ctrl.grid = {
            options: {},
            api: {},
            methods: {}
        };

    }

    angular.module('meanApp')
        .controller('AboutCtrl', AboutController)
        .directive('about', function () {
            return {
                templateUrl: 'app/views/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'ctrl'
            }
        });


})();
