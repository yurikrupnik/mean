(function () {

    'use strict';

    angular.module('api', [])
        .service('api', function ($http, spinnerService) {
            var url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json';

            function spinnerHide() {
                spinnerService.hide();
            }

            function splitDataToDataAndCount(data) {
                return {
                    data: data.data,
                    count: data.data.length
                }
            }

            this.getFullData = function () {
                spinnerService.show();
                return $http.get(url)
                    .then(splitDataToDataAndCount)
                    .finally(spinnerHide);
            };
            this.getByPage = function (page) {
                spinnerService.show();
                return $http.get(url)
                    .then(function (response) {
                        var data = response.data;
                        var filteredData;
                        switch (page) {
                            case 1:
                            {
                                filteredData = data.slice(0, 100);
                                break;
                            }
                            case 2:
                            {
                                filteredData = data.slice(100, 200);
                                break;
                            }
                            case 3:
                            {
                                filteredData = data.slice(200, 300);
                                break;
                            }
                            case 4:
                            {
                                filteredData = data.slice(300, 400);
                                break;
                            }
                            case 5:
                            {
                                filteredData = data.slice(400, 500);
                                break;
                            }
                        }

                        return filteredData;

                    })
                    .finally(spinnerHide);
            };


            // AngularJS will instantiate a singleton by calling "new" on this function
        });

})();
