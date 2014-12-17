'use strict';

describe('Controller: CadastroCtrl', function () {

  // load the controller's module
  beforeEach(module('portalSiteApp'));

  var CadastroCtrl, $scope, $httpBackend;
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    $scope = $rootScope.$new();


    $httpBackend = $injector.get('$httpBackend');

    CadastroCtrl = $controller('CadastroCtrl', {
      $scope: $scope
    });

    $scope.cadastro = {
      documento : '4565465645',
      nome : '5asdfasdfaasdfa',
      usuario : {
        email : 'emanuel@asdaf',
        senha : '123456'
      }
    };
    
  }));

  
  it('Teste unitário valida senha', function () {
    $scope.confirmacaoSenha = '123456';
    expect($scope.validaSenha()).toBe(true); 
    $scope.confirmacaoSenha = '1234567';
    expect($scope.validaSenha()).toBe(false); 
    $scope.cadastro.usuario = null;
    expect($scope.validaSenha()).toBe(false);
  });

  it('Test mensagem de retorno "success", sucesso ao salvar candidato', function () {
 
    $httpBackend.when('POST', '/api/cadastro').respond(200, {'documento':'4565465645','nome':'5asdfasdfaasdfa','usuario':{'email':'emanuel@asdaf','senha':'123456'}});

    $scope.save();

    $httpBackend.flush();

    expect($scope.success).toBe(true);
    expect($scope.mensagens).toBe(null);
  });

  it('Testes salvar candidato com CPF já cadastrado', function () {

    $httpBackend.when('POST', '/api/cadastro').respond(400, ['mensagem de erro']);

    $scope.save();

    $httpBackend.flush();

    expect($scope.success).toBe(null);
    expect($scope.mensagens.length).toBe(1);
  });

  it('Testes salvar candidato com email já cadastrado', function () {

    $httpBackend.when('POST', '/api/cadastro').respond(400, ['mensagem de erro']);

    $scope.save();

    $httpBackend.flush();

    expect($scope.success).toBe(null);
    expect($scope.mensagens.length).toBe(1);
  });

  it('Testes salvar candidato com email e CPF já cadastrado', function () {

    $httpBackend.when('POST', '/api/cadastro').respond(400, ['mensagem de erro 1', 'mensagem de erro 2']);

    $scope.save();

    $httpBackend.flush();

    expect($scope.success).toBe(null);
    expect($scope.mensagens.length).toBe(2);
  });

  it('Testes salvar candidato e retornar erro desconhecido', function () {

    $httpBackend.when('POST', '/api/cadastro').respond(500);

    $scope.save();

    $httpBackend.flush();

    expect($scope.success).toBe(null);
    expect($scope.mensagens.length).toBe(1);
    expect('Não foi possível processar a requisição').toBe($scope.mensagens[0]);
  });

});