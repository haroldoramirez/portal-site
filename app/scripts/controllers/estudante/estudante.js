  'use strict';

angular.module('portalSiteApp')
  .controller('EstudanteCtrl', function($scope, $routeParams, $document, Estudante, Cidade, Bairro, Estado, Endereco, toastr) {
    
    // $scope.opened = false;

    $scope.init = function() {  

      $scope.loadEstados();
      console.log($scope.estudante);
                   
      if ($scope.estudante.cep&&$scope.estudante.cep!==''){
         $scope.buscarCEP($scope.estudante.cep);      
      }
      if ($scope.estudante.pne==='SIM'){
         $scope.estudante.pne=true;
      }else {
        $scope.estudante.pne = false;
        $scope.estudante.pneTipo = null;
      }

    };


    //Locale
    $scope.buscarCEP = function(cep) {
      Endereco.getByCep({cep:cep}, function(data) {
        $scope.mensagemCEP = null;
        var endereco = data[0];
        $scope.endereco = {
          estado: endereco.bairro.cidade.estado,
          cidade: endereco.bairro.cidade,
          bairro: endereco.bairro
        };
        $scope.cidades = Cidade.findByUF({uf: $scope.endereco.estado.sigla});
        $scope.bairros = Bairro.findByCidade({cidade: $scope.endereco.cidade.id});
      }, function(response) {
        if (response.status === 404) {
          $scope.mensagemCEP = 'CEP não encontrado';
        }
        toastr.error($scope.mensagemCEP);
      });
    };

    $scope.validatePNE = function(){
      if (($scope.estudante.pne===true||$scope.estudante.pne==='SIM')&&$scope.estudante.pneTipo!==null) {
        return true;
      } else if (($scope.estudante.pne===false||$scope.estudante.pne==='NAO')||!$scope.estudante.pne) {
        return true;
      } else return false;
    }

    $scope.loadEstados = function() {
      $scope.cidades = null;
      $scope.bairros = null;
      $scope.estados = Estado.getAll();
    };

    $scope.loadCidades = function(estado) {
      $scope.estudante.cep = null;
      $scope.bairros = null;
      $scope.endereco.cidade = null;
      $scope.cidades = Cidade.findByUF({uf: estado.sigla});
    };

    $scope.loadBairros = function(cidade) {
      $scope.estudante.cep = null;
      $scope.bairros = Bairro.findByCidade({cidade: cidade.id});
    };


    $scope.save = function() {

      $scope.estudante.bairro = $scope.endereco.bairro.nome;
      $scope.estudante.cidade = $scope.endereco.cidade.nome;
      $scope.estudante.estado = $scope.endereco.estado.nome;

      if ($scope.estudante.pne===true) {
        $scope.estudante.pne = 'SIM';
      } else if ($scope.estudante.pne===false){
        $scope.estudante.pne = 'NAO';
        $scope.estudante.pneTipo = null;
      } else {
        $scope.estudante.pne = 'NAO';
        $scope.estudante.pneTipo = null;
      }
  
    
      Estudante.update({id: $scope.estudante.id}, $scope.estudante, function(data){
        $scope.estudante = data;
        console.log($scope.estudante);
        if (data.pne==='SIM'){
          $scope.estudante.pne=true;
        } else if (data.pne==='NAO'){
          $scope.estudante.pne=false;
        } else {
          $scope.estudante.pne=false;
        }
        console.log($scope.estudante);
        toastr.success('Cadastro atualizado com sucesso');
      }, function(data){
        toastr.success('Erro ao atualizar', data);
      });
      
      $document.scrollTopAnimated(0, 700);

    };

    $scope.openDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = !$scope.opened;
    };

  });
