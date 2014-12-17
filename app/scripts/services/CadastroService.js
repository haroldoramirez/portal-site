'use strict';

angular.module('portalSiteApp')
  .service('Cadastro', ['$resource', function($resource) {
    return $resource('/api/cadastro');
  }]);