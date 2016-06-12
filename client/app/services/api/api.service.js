(function () {

    'use strict';

    angular.module('api', [])
        .service('CSVService', function (lodash, spinnerService, paginationService, $q) {
            var resource = null;
            var action = '';

            function getAction() {
                return action;
            }

            function setResource(a, act) {
                resource = a;
                action = act;
            }

            function getResource() {
                return resource;
            }

            function getData(response) {
                return response.data;
            }

            function getDataOfResponses(responses) {
                return lodash.map(responses, getData);
            }

            function flattenResponses(responses) {
                // responses = [ [{},{}...], [], []]
                return lodash.flatten(getDataOfResponses(responses));
            }

            function createPromisesForCSV(params) {
                params.limit = 10000; // objects in single page
                var totalCount = paginationService.getTotalCount();
                var cap = Math.ceil(totalCount / params.limit); // amount of pages needed to fetch all the data for scv
                var pages = lodash.range(1, cap + 1);

                function createPromise(page) {
                    return getResource()[getAction()](lodash.assign({}, params, {page: page})).$promise;
                }

                return lodash.map(pages, createPromise);
            }

            function createPromise(params) {
                var promises = createPromisesForCSV(params);
                spinnerService.show();
                return $q.all(promises)
                    .then(flattenResponses)
                    .finally(res => spinnerService.hide());
            }

            this.createPromise = createPromise;
            this.setResource = setResource;

        })

})();
