'use strict';

angular.module('portalSiteApp')
.service('Estudante', ['$resource',
  function($resource){
    return $resource('/api/estudantes/:id', {}, {
      query: {method: 'GET', isArray: true},
      findByCPF: {method: 'GET', url: '/api/estudantes/cep/:cpf', isArray: false},
      findAll: {method: 'GET', url: '/api/estudantes', isArray: true},
      update: {method: 'PUT'}
    });
  }])
.service('EstudanteExperiencia', ['$resource',
	function($resource){
	return $resource('/api/estudantes/:idEstudante/experiencias/:id', {}, {
	  findByEstudante: {method: 'GET', url: '/api/estudantes/:idEstudante/experiencias', isArray: true},
	  save: {method: 'POST', url: '/api/estudantes/:idEstudante/experiencias', isArray: false},
	  delete: {method: 'DELETE', url: '/api/estudantes/:idEstudante/experiencias/:id'},
	  update: {method: 'PUT', url: '/api/estudantes/:idEstudante/experiencias/:id', isArray: false}
	});
}])
.service('EstudanteCurso', ['$resource',
	function($resource){
	return $resource('/api/estudantes/:idEstudante/cursos:id', {}, {
	  findByEstudante: {method: 'GET', url: '/api/estudantes/:idEstudante/cursos', isArray: true},
	  save: {method: 'POST', url: '/api/estudantes/:idEstudante/cursos', isArray: false},
	  delete: {method: 'DELETE', url: '/api/estudantes/:idEstudante/cursos/:id'},
	  update: {method: 'PUT', url: '/api/estudantes/:idEstudante/cursos/:id', isArray: false}
	});
}])
.service('EstudanteConhecimento', ['$resource',
	function($resource){
	return $resource('/api/estudantes/:idEstudante/informatica/:id', {}, {
	  findByEstudante: {method: 'GET', url: '/api/estudantes/:idEstudante/informatica', isArray: true},
	  save: {method: 'POST', url: '/api/estudantes/:idEstudante/informatica', isArray: false},
	  delete: {method: 'DELETE', url: '/api/estudantes/:idEstudante/informatica/:id'},
	  update: {method: 'PUT', url: '/api/estudantes/:idEstudante/informatica/:id', isArray: false}
	});
}])
.service('EstudanteGrupoConhecimento', ['$resource',
	function($resource){
	return $resource('/api/grupos/:id', {}, {
		findAllConhecimentoInformaticaByIdGroup: {method: 'GET', url: '/api/grupos/:id/informatica', isArray: true}, 
	  findAll: {method: 'GET', url: '/api/grupos', isArray: true},
	  save: {method: 'POST', url: '/api/grupos/', isArray: false},
	  update: {method: 'PUT', url: '/api/grupos/:id', isArray: false}
	});
}])		
.service('EstudanteIdioma', ['$resource',
	function($resource){
	return $resource('/api/estudantes/:idEstudante/idiomas/:id', {}, {
	  findAllByEstudante: {method: 'GET', url: '/api/estudantes/:idEstudante/idiomas', isArray: true},
	  save: {method: 'POST', url: '/api/estudantes/:idEstudante/idiomas', isArray: false},
	  delete: {method: 'DELETE', url: '/api/estudantes/:idEstudante/idiomas/:id'},
	  update: {method: 'PUT', url: '/api/estudantes/:idEstudante/idiomas/:id', isArray: false}
	});
}])
.service('Idioma', ['$resource',
	function($resource){
	return $resource('/api/estudantes/idiomas/:id', {}, {
	  query: {method: 'GET', isArray: true},
	  findAll: {method: 'GET', url: '/api/idiomas', isArray: true}
	});
}]);
