'use strict';

describe('Controller: EstudanteCtrl', function () {

  // load the controller's module
  beforeEach(module('portalSiteApp'));

  var EstudanteCtrl, $scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    $scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $scope.estudante = {id:null, cep:null, pne:null, pneTipo:null};
    EstudanteCtrl = $controller('EstudanteCtrl', {
      $scope: $scope,
    });
  }));

  //Teste unitário
  it('Teste validatePNE (valida opções de PNE)', function () {
    $scope.estudante.pne = true;
    $scope.estudante.pneTipo = null;
    expect($scope.validatePNE()).toBe(false);

    $scope.estudante.pne = true;
    $scope.estudante.pneTipo = 'FISICO';
    expect($scope.validatePNE()).toBe(true);
    
    $scope.estudante.pne = false;
    $scope.estudante.pneTipo = 'FISICO';
    expect($scope.validatePNE()).toBe(true);

    $scope.estudante.pne = 'SIM';
    $scope.estudante.pneTipo = 'FISICO';
    expect($scope.validatePNE()).toBe(true);
  });

    //Teste unitário
  it('Teste openDatePicker (valida abrir ou fechar datePicker)', function () {

    $scope.opened = true;   
    expect($scope.opened).toBe(true);
    $scope.opened = !$scope.opened;
    expect($scope.opened).toBe(false);

  });

  //Teste unitário
  it('Carregar bairros', function () {
    $scope.estudante = {cep:'85862590'};
    expect($scope.bairros).toBeUndefined();
    var cidade = {id:6091};
    
    $httpBackend.when('GET','/api/bairros/cidade/'+cidade.id).respond(200, [{}]);
    $scope.loadBairros(cidade);
    $httpBackend.flush();
     

    expect($scope.bairros).not.toBe(null);
    expect($scope.bairros instanceof Array).toBeTruthy();
  });

  //Teste unitário
  it('Carregar cidades', function () {
    $scope.estudante = {cep:'85862590'};
    $scope.bairros = null; // Na controller original esses objetos são instanciados por outros métodos, 
    $scope.endereco = {cidade : null}; //Como esse é um teste unitário se esses objetos não forem instanciados o erro 'undefined' será retornado
    var estado = {sigla:'PR'}; //Estado pelo qual as cidades serão requisitadas

    expect($scope.cidades).toBeUndefined();

    $httpBackend.when('GET','/api/cidades/estado/'+estado.sigla).respond(200, [{}]);
    $scope.loadCidades(estado);
    $httpBackend.flush();
     
    expect($scope.bairros).toBeNull();
    expect($scope.endereco.cidade).toBeNull();
    expect($scope.cidades instanceof Array).toBeTruthy();
  });

  //Teste unitário
  it('Carregar estados', function () {
    $scope.cidades = null;
    $scope.bairros = null;
    
    var estados = [{}];
    for (var i = 0; i <= 27; i++) {
      estados.push({nome:'Cidade ' + (i+1), id:(i+1)});
    }

    $httpBackend.when('GET','/api/estados').respond(200, [{}]);
    $scope.loadEstados();
    $httpBackend.flush();
    
    expect($scope.bairros).toBeNull();
    expect($scope.cidades).toBeNull();
    expect($scope.estados instanceof Array).toBeTruthy();
  });



  //Teste de integração
  it('Buscar endereço pelo CEP', function () {
    $scope.estudante.cep = '85862590';
    var enderecoResposta = [{'id': '293266','cep': '85862590','logradouro': 'RUA ERNESTO GAYER','bairro': {'id': '8872','nome': 'LOTEAMENTO WITT','cidade': {'id': '6091','nome': 'FOZ DO IGUAÇU','estado': {'id': '17','sigla': 'PR','nome': 'PARANÁ'}}}}];
    
    $httpBackend.when('GET','/api/enderecos/cep/'+$scope.estudante.cep).respond(200, enderecoResposta);
    //Internamente é esperado dentro da função 'buscarCEP(cep)' essas duas funções, por isso as mesmas devem ser constadas como esperadas na variável de backend
    $httpBackend.expectGET('/api/cidades/estado/'+enderecoResposta[0].bairro.cidade.estado.sigla).respond(200, []);
    $httpBackend.expectGET('/api/bairros/cidade/'+enderecoResposta[0].bairro.cidade.id).respond(200, []);
    $scope.buscarCEP($scope.estudante.cep);
    $httpBackend.flush();

    expect($scope.mensagemCEP).toBeNull();
    expect($scope.endereco).not.toBeNull();
    expect($scope.endereco.bairro).not.toBeNull();
    expect($scope.endereco.cidade).not.toBeNull();
    expect($scope.endereco.estado).not.toBeNull();

    expect($scope.cidades).not.toBeNull();
    expect($scope.bairros).not.toBeNull();

    expect($scope.cidades instanceof Array).toBeTruthy();
    expect($scope.bairros instanceof Array).toBeTruthy();
  });

  //Teste de integração
  it('Buscar endereço pelo CEP inexistente', function () {
    var cepBusca = '85862590';
    var enderecoResposta = [{'id': '293266','cep': '85862590','logradouro': 'RUA ERNESTO GAYER','bairro': {'id': '8872','nome': 'LOTEAMENTO WITT','cidade': {'id': '6091','nome': 'FOZ DO IGUAÇU','estado': {'id': '17','sigla': 'PR','nome': 'PARANÁ'}}}}];
    
    $httpBackend.when('GET','/api/enderecos/cep/'+cepBusca).respond(404, enderecoResposta);
    $scope.buscarCEP(cepBusca);
    $httpBackend.flush();

    expect($scope.mensagemCEP).not.toBeNull();
    expect($scope.mensagemCEP).toEqual('CEP não encontrado');

  });

  //Teste de integração
  it('Função init com o cep', function () {

    var enderecoResposta = [{'id': '293266','cep': '85862590','logradouro': 'RUA ERNESTO GAYER','bairro': {'id': '8872','nome': 'LOTEAMENTO WITT','cidade': {'id': '6091','nome': 'FOZ DO IGUAÇU','estado': {'id': '17','sigla': 'PR','nome': 'PARANÁ'}}}}];
    var estudanteResposta = {'cep':'85862590', 'pne':'SIM'};

    $scope.estudante = {'cep':'85862590', 'pne':'NAO'};

    $httpBackend.expectGET('/api/estados').respond(200, []);
    $httpBackend.expectGET('/api/enderecos/cep/' +estudanteResposta.cep).respond(200, enderecoResposta);
    $httpBackend.expectGET('/api/cidades/estado/'+enderecoResposta[0].bairro.cidade.estado.sigla).respond(200, []);
    $httpBackend.expectGET('/api/bairros/cidade/'+enderecoResposta[0].bairro.cidade.id).respond(200, []);
    $scope.init();
    $httpBackend.flush();

    expect($scope.estudante).not.toBeNull();
    expect($scope.estudante.pne).toBe(false);

    expect($scope.mensagemCEP).toBeNull();
    expect($scope.endereco).not.toBeNull();
    expect($scope.endereco.bairro).not.toBeNull();
    expect($scope.endereco.cidade).not.toBeNull();
    expect($scope.endereco.estado).not.toBeNull();

    expect($scope.cidades).not.toBeNull();
    expect($scope.bairros).not.toBeNull();

    expect($scope.estados instanceof Array).toBeTruthy();
    expect($scope.cidades instanceof Array).toBeTruthy();
    expect($scope.bairros instanceof Array).toBeTruthy();
  });

  //Teste de integração
  it('funcao init sem o cep', function () {

    var enderecoResposta = [{'id': '293266','cep': '85862590','logradouro': 'RUA ERNESTO GAYER','bairro': {'id': '8872','nome': 'LOTEAMENTO WITT','cidade': {'id': '6091','nome': 'FOZ DO IGUAÇU','estado': {'id': '17','sigla': 'PR','nome': 'PARANÁ'}}}}];
    var estudanteResposta = {'cep':'85862590', 'pne':'SIM'};

    $scope.estudante = {'cep':null, 'pne':'SIM'};
    
    $httpBackend.expectGET('/api/estados').respond(200, []);
    $scope.init();
    $httpBackend.flush();

    expect($scope.estudante).not.toBeNull();
    expect($scope.estudante.pne).toBe(true);

    expect($scope.mensagemCEP).toBeUndefined();
    expect($scope.endereco).toBeUndefined();

    expect($scope.cidades).toBeNull();
    expect($scope.bairros).toBeNull();

    expect($scope.estados instanceof Array).toBeTruthy();
  });



  //Teste unitário
  it('Salvando estudante (neste caso atualizando)', function () {
    //Dependências de outras unidades
    $scope.endereco = {bairro: {nome:null}, cidade : {nome:null}, estado : {nome:null}};


    $scope.estudante = {'id': 1,
                        'nomeCompleto': 'Emanuel Victor de Oliveira Fonseca',
                        'nomeDaMae': 'Valdina Maia de Oliveira Fonseca',
                        'cpf': '07074762911',
                        'dataNascimento': '1990-12-16',
                        'genero': 'MASCULINO',
                        'estadoCivil': 'SOLTEIRO',
                        'nacionalidade': 'Brasileiro',
                        'dataAtualizacao': '2014-02-16',
                        'trabalhando': '1',
                        'pne': 'true',
                        'pneTipo': 'FISICO',
                        'nomeDoPai': 'Israel Fonseca',
                        'cep': '85862590',
                        'logradouro': 'Três Lagoas',
                        'numero': '393',
                        'complemento': 'Em frente ao cemitério',
                        'bairro': 'LOTEAMENTO WITT',
                        'cidade': 'FOZ DO IGUAÇU',
                        'estado': 'PARANÁ',
                        'pais': null,
                        'rg': '92360741',
                        'orgaoExpedidor': 'PR',
                        'telefoneResidencial': '4535771707',
                        'telefoneComercial': '45354545455',
                        'telefoneCelular': '4599775730',
                        'disponibilidade': 'MANHA',
                        'linkCnpq': 'HTTP://LATTES.CNPQ.BR/3381250923725891',
                        'usuario': null
                      };
    $scope.estudante.pais = 'BRASIL';
    $scope.estudante.numero = '395';
    
    $httpBackend.when('PUT','/api/estudantes/'+$scope.estudante.id).respond(200, $scope.estudante);             
    $scope.save();
    $httpBackend.flush();

    expect($scope.estudante).not.toBe(null);
    expect($scope.estudante.pais).toEqual('BRASIL');
    expect($scope.estudante.numero).toEqual('395');
    expect($scope.estudante.usuario).toBeNull();
  });
});