'use strict';

angular.module('portalSiteApp')
// Vai puxar o estado e todas as cidades que estão no estado
.service('Estado', ['$resource',
  function($resource){
    return $resource('/api/estados', {},  {
      getAll: {method:'GET', params:{}, isArray: true}
    });
}])
// Vai puxar a cidade e todos os bairros que estão na cidade
.service('Cidade', ['$resource',
  function($resource){
    return $resource('/api/cidades/:descricao', {}, {
      findByUF: {method: 'GET', url: '/api/cidades/estado/:uf', params:{uf:'uf'}, isArray: true},
      getAll: {method:'GET', url: '/api/cidades', isArray:true}
    });
}])
// Vai puxar o bairro e todas as cidades que estão no bairro
.service('Bairro', ['$resource',
  function($resource){
    return $resource('/api/bairros/:id', {}, {
      findByCidade: {method: 'GET', url: '/api/bairros/cidade/:cidade', params:{cidade:'cidade'}, isArray: true},
      getAll: {method:'GET', url: '/api/bairros', params:{}, isArray: true}
    });
}])
// Vai puxar o endereço e todos os bairros que estão no endereço
.service('Endereco', ['$resource',
  function($resource ){
    return $resource('/api/enderecos/cep/:cep', {} ,{
      getByCep: {method: 'GET', url: '/api/enderecos/cep/:cep', params:{cep:'cep'}, isArray: true}
    });
}]);