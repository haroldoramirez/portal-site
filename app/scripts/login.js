'use strict';

/**
 * @ngdoc function
 * @name portalSiteLogin.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the portalSiteLogin
 */
angular.module('portalSiteLogin', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .controller('LoginCtrl', function ($scope, $window) {
    $scope.auth = function() {
      $window.location.href = '/#/curriculo';
    };
  });
