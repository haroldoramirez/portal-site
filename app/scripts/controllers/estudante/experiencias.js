'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:EstudanteExperienciasCtrl
 * @description
 * # EstudanteExperienciasCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('EstudanteExperienciasCtrl', function ($scope, EstudanteExperiencia, $modal) {

   	$scope.init = function(){
   		$scope.experiencias = EstudanteExperiencia.findByEstudante({idEstudante:$scope.estudante.id});
   	}

	$scope.openExperiencia = function(experiencia) {
	    $modal.open({
	      templateUrl : 'experiencia.html',
	      controller : 'EstudanteExperienciaModalCtrl',
	      size : 'md',
		  resolve : {
	       bundle : function() {
	         return {
	           estudante : $scope.estudante,
	           experiencia : experiencia,
	           experiencias : $scope.experiencias
	         }
	       }
	      }
	   }).result.then(function(/*experiencias*/) {
	     /*$scope.experiencias = experiencias;*/
	     $scope.init();
	   }, function() {
		  $scope.init();
	   });
	};


  }).controller('EstudanteExperienciaModalCtrl', function ($scope, EstudanteExperiencia, bundle, $modalInstance, $modal, toastr) {
  		
	$scope.experiencia = bundle.experiencia;
	$scope.estudante = bundle.estudante;
	$scope.experiencias = bundle.experiencias;
  	
	$scope.today = new Date();

  	$scope.save = function(){
      var msg = 'Expereiência adicionada com sucesso';
      if($scope.experiencia.id) {msg = 'Experiência atualizada com sucesso'}

      $scope.experiencia.estudante = $scope.estudante;

      EstudanteExperiencia.save({idEstudante:$scope.experiencia.estudante.id}, $scope.experiencia, function(data){
         toastr.success(msg);
         $scope.close();
      }, function(error){
         toastr.error(error, 'ERRO AO SALVAR EXPERIENCIA: ');
      });
  	};

  	$scope.delete = function(){
      EstudanteExperiencia.delete({idEstudante:$scope.experiencia.estudante.id, id:$scope.experiencia.id}, function(data){
         toastr.success('Experiência removida com sucesso');
         $scope.close();
      }, function(error){
         toastr.error(error, 'ERRO AO REMOVER EXPERIENCIA: ');
      });
  	};

  	$scope.close = function() {
      $modalInstance.close();
	};

	$scope.openDatePickerDataInicio = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.openedDataInicio = !$scope.openedDataInicio;
   	};	

   $scope.openDatePickerDataTermino = function($event) {
       $event.preventDefault();
       $event.stopPropagation();
       $scope.openedDataTermino = !$scope.openedDataTermino;
   	};

  });
