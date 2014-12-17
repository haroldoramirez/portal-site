'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:EstudanteIdiomasCtrl
 * @description
 * # EstudanteIdiomasCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('EstudanteIdiomasCtrl', function ($scope, EstudanteIdioma, $modal) {

	 	$scope.init = function(){
	 		$scope.idiomas = EstudanteIdioma.findAllByEstudante({idEstudante:$scope.estudante.id});
	 	}

		$scope.optionsIdiomas = ['Básico','Intermediário','Técnico','Fluente'];
		
		$scope.openIdioma = function(idioma) {
	    $modal.open({
	      templateUrl : 'idioma.html',
	      controller : 'EstudanteIdiomaModalCtrl',
	      size : 'md',
		  	resolve : {
	       bundle : function() {
	          return {
	           estudante : $scope.estudante,
	           idioma : idioma
	          }
	        }
	      }
	   	}).result.then(function() {
	     	$scope.init();
	   	}, function() {
		  	$scope.init();
	   	});
		};

  }).controller('EstudanteIdiomaModalCtrl', function ($scope, EstudanteIdioma, Idioma, bundle, $modalInstance, $modal, toastr) {
  		

		$scope.idioma = bundle.idioma;
		$scope.estudante = bundle.estudante;
		$scope.idiomas = Idioma.findAll();
  	

  	$scope.save = function(){
      var msg = 'Idioma adicionada com sucesso';
      
      if($scope.idioma.id) {msg = 'Idioma atualizada com sucesso'}

      $scope.idioma.estudante = $scope.estudante;

      EstudanteIdioma.save({idEstudante:$scope.estudante.id}, $scope.idioma, function(data){
       toastr.success(msg);
       $scope.close();
      }, function(error){
       toastr.error('Erro ao salvar conhecimento');
    	});
  	};

  	$scope.delete = function(){
      EstudanteIdioma.delete({idEstudante:$scope.estudante.id, id:$scope.idioma.id}, function(data){
       toastr.success('Idioma removido com sucesso');
       $scope.close();
      }, function(error){
       toastr.error('Erro ao remover idioma');
      });
  	};

  	$scope.close = function() {
    	$modalInstance.close();
		};

  });
