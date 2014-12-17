'use strict';

/**
 * @ngdoc function
 * @name portalSiteApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the portalSiteApp
 */
angular.module('portalSiteApp')
  .controller('CadastroCtrl', function ($scope, Cadastro, toastr) {


    $scope.confirmacaoSenha = null;
    $scope.cadastro = {
      usuario: null
    };
    
    $scope.mensagens = null;

    $scope.save = function() {

      $scope.cadastro.usuario.login = $scope.cadastro.usuario.email;
      
      Cadastro.save($scope.cadastro, function() {      
        $scope.mensagens = null;
        $scope.success = true;
        toastr.success('Em instantes você receberá um email para confirmação','Seu cadastro foi realizado');
        $scope.cadastro = {
          usuario: null
        };
        $scope.confirmacaoSenha = null;
      }, function(response) {
        $scope.success = null;
        if (response.status === 500 /*mensagem de erro interno*/) {
          $scope.mensagens = ['Não foi possível processar a requisição'];
        }else {
          $scope.mensagens = response.data;
        }
        for (var i = 0; i < $scope.mensagens.length; i++) {
          toastr.error($scope.mensagens[i]);
        }
      });

    };
    
    $scope.validaSenha = function() {
      if ($scope.cadastro.usuario && ($scope.confirmacaoSenha === $scope.cadastro.usuario.senha)) {
        return true;
      } 
      return false;
    };


}).controller('CadastroSucessoCtrl', function ($scope, $routeParams) {
  $scope.email = $routeParams.email;
});
