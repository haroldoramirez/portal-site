'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('MenuCtrl', function ($rootScope, $location) {
    
    $rootScope.home = function(){
			return $location.path()==='/';
    };

  });
