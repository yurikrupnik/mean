(function(angular, undefined) {
'use strict';

angular.module('meanApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})

;
})(angular);