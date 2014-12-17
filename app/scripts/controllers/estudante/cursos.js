'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:EstudanteCursosCtrl
 * @description
 * # EstudanteCursosCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('EstudanteCursosCtrl', function ($scope, EstudanteCurso, $modal) {
    
  $scope.init = function(){
 		$scope.cursos = EstudanteCurso.findByEstudante({idEstudante:$scope.estudante.id});
 	}

	$scope.openCurso = function(curso) {
    $modal.open({
      templateUrl : 'cursoDoCandidato.html',
      controller : 'EstudanteCursoModalCtrl',
      size : 'md',
	  	resolve : {
       bundle : function() {
         return {
           estudante : $scope.estudante,
           curso : curso,
           cursos : $scope.cursos
         }
       }
      }
    }).result.then(function() {
   	 $scope.init();
    }, function() {
	   $scope.init();
    });
	};


  }).controller('EstudanteCursoModalCtrl', function ($scope, EstudanteCurso, bundle, $modalInstance, $modal, toastr) {
  		
		$scope.curso = bundle.curso;
		$scope.estudante = bundle.estudante;
		$scope.cursos = bundle.cursos;
  	
  	$scope.save = function(){
      var msg = 'Curso adicionado com sucesso';
      if($scope.curso.id) {msg = 'Curso atualizado com sucesso'}

      $scope.curso.estudante = $scope.estudante;

      EstudanteCurso.save({idEstudante:$scope.curso.estudante.id,id:$scope.curso.id}, $scope.curso, function(data){
         toastr.success(msg);
         $scope.close();
      }, function(error){
         toastr.error(error, 'Erro ao salvar curso');
      });
  	};

  	$scope.delete = function(){
      EstudanteCurso.delete({idEstudante:$scope.curso.estudante.id,id:$scope.curso.id}, function(data){
         toastr.success('Curso removido com sucesso');
         $scope.close();
      }, function(error){
         toastr.error('Erro ao remover curso');
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
