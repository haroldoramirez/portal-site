'use strict';

/**
 * @ngdoc service
 * @name portalSiteApp.Autenticacao
 * @description
 * # Autenticacao
 * Service in the portalSiteApp.
 */
angular.module('portalSiteApp')
  .service('Autenticacao', ['$resource',
  function($resource){
    return $resource('/api/autenticacao/:login/:senha', {}, {
    });
  }]);