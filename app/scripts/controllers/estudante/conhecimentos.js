'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:EstudanteConhecimentosCtrl
 * @description
 * # EstudanteConhecimentosCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('EstudanteConhecimentoCtrl', function ($scope, EstudanteConhecimento, $modal) {

  	$scope.optionsNiveis = ['Básico','Intermediário','Avançado'];

	 	$scope.init = function(){
	 		$scope.conhecimentos = EstudanteConhecimento.findByEstudante({idEstudante:$scope.estudante.id});
	 	}

		$scope.openConhecimento = function(conhecimento) {
	    $modal.open({
	      templateUrl : 'conhecimento.html',
	      controller : 'EstudanteConhecimentoModalCtrl',
	      size : 'md',
		  	resolve : {
	       bundle : function() {
	          return {
	           estudante : $scope.estudante,
	           conhecimento : conhecimento
	          }
	        }
	      }
	   	}).result.then(function() {
	     	$scope.init();
	   	}, function() {
		  	$scope.init();
	   	});
		};

  }).controller('EstudanteConhecimentoModalCtrl', function ($scope, EstudanteGrupoConhecimento, EstudanteConhecimento, bundle, $modalInstance, $modal, toastr) {
  		
		$scope.conhecimento = bundle.conhecimento;
		$scope.estudante = bundle.estudante;
  	
  	$scope.grupos = EstudanteGrupoConhecimento.findAll();
  	if ($scope.conhecimento) {
      if ($scope.conhecimento.id) {
    		$scope.conhecimentos = 
    		EstudanteGrupoConhecimento.findAllConhecimentoInformaticaByIdGroup({id:$scope.conhecimento.conhecimentoInformatica.grupoConhecimento.id});
    	};
	  };  
    
		$scope.loadConhecimentos = function(id){
			$scope.conhecimento.conhecimentoInformatica.descricao = null;
			$scope.conhecimentos = EstudanteGrupoConhecimento.findAllConhecimentoInformaticaByIdGroup({id:id});
		};


  	$scope.save = function(){
      var msg = 'Conhecimento adicionado com sucesso';
      
      if($scope.conhecimento.id) {msg = 'Conhecimento atualizado com sucesso'}

      $scope.conhecimento.estudante = $scope.estudante;

      EstudanteConhecimento.save({idEstudante:$scope.conhecimento.estudante.id, id:$scope.conhecimento.id}, $scope.conhecimento, function(data){
       toastr.success(msg);
       $scope.close();
      }, function(error){
       toastr.error('Erro ao salvar conhecimento');
    	});
  	};

  	$scope.delete = function(){
      EstudanteConhecimento.delete({idEstudante:$scope.estudante.id, id:$scope.conhecimento.id}, function(data){
       toastr.success('Conhecimento removido com sucesso');
       $scope.close();
      }, function(error){
       toastr.error('Erro ao remover conhecimento');
      });
  	};

  	$scope.close = function() {
    	$modalInstance.close();
		};

  });