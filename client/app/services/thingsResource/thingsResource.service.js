(function () {
    'use strict';

    angular.module('meanAppServices')
        .service('Thing', function ($resource, spinnerService) {

            var url = '/api/things/:id';
            var defaultParams = {id: '@id'};
            var actions = {
                update: {
                    method: 'PUT',
                    params: {
                        id: '@id'
                    }
                }
            };

            var Thing = $resource(url, defaultParams, actions);


            function querySpinnerHide(data) {
                spinnerService.hide();
            }


            this.all = function (cb) {
                spinnerService.show();
                return Thing.query(querySpinnerHide);
            };

            this.one = function (model) {
                spinnerService.show();
                return Thing.get({id: model._id}, querySpinnerHide);
            };
            this.new = function () {
                return new Thing();
            };

        });
})();
