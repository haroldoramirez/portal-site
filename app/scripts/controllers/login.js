'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('LoginCtrl', function ($routeParams, $scope, $rootScope, $window, $cookieStore, Autenticacao, Estudante, toastr) {

    if ($routeParams.sair) {
      $cookieStore.remove('estudante');
      $rootScope.estudante = null;
      $window.location.href = ' /#/home';
    } else if($routeParams.entrar){
      if ($cookieStore.get('estudante')) {
        $window.location.href = ' /#/curriculo';
      }
    }


    $scope.authenticate = function() {

    	Autenticacao.get({login:$scope.login.login, senha:$scope.login.senha}, function(){
        Estudante.findAll(function(data){
          for (var i = 0; i < data.length; i++) {
            if ($scope.login.login===data[i].usuario.login) {
              $rootScope.estudante = data[i];
              console.log($scope.estudante);
              $cookieStore.put('estudante',$rootScope.estudante);
              $window.location.href = ' /#/curriculo';
            }
          }
          if (!$rootScope.estudante) {
            toastr.error(data.data);
          }  
        });
    	}, function(data){
				toastr.error(data.data);
    	});
      
    };
  });