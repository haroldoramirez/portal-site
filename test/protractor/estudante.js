describe('Edição de estudante', function() {
  
  var nome = element(by.name('name'));
  var radioButtonGenero = element(by.name('genero'));
  var selectEstadoCivil = element(by.name('estadoCivil'));
  var inputNacionalidade = element(by.name('nacionalidade'));
  var inputDataNascimento = element(by.name('data_nascimento'));
  var inputRG = element(by.name('rg'));
  var selectOrgaoExpedidor = element(by.name('orgao_expedidor'));
  var inputNomeMae = element(by.name('name_mom')); 
  var inputNomePai = element(by.name('name_dad'));
  var inputTelefoneCelular = element(by.name('telefone_celular'));
  var inputTelefoneResidencial = element(by.name('telefone_residencial'));
  var inputTelefoneComercial = element(by.name('telefone_comercial'));
  var inputCEP = element(by.name('cep'));  
  var cepErrorMessage = element(by.name('mensagemCEP'));
  var selectEstado = element(by.name('estado'));
  var selectCidade = element(by.name('cidade'));
  var selectBairro = element(by.name('bairro'));   
  var inputLogradouro = element(by.name('logradouro'));
  var inputNumero = element(by.name('numero'));
  var inputComplemento = element(by.name('complemento'));
  var checkBoxPNE = element(by.name('pne'));
  var selectPNETipo = element(by.name('pneTipo'));
  var radioButtonSituacaoAtual = element(by.name('situacao_atual'));
  var selectDisponibilidade = element(by.name('disponibilidade'));
  var inputLINKCNPQ = element(by.name('link_cnpq'));

  var btnSalvarInformacoes = element(by.name('btn_salvar_informacoes'));
  
  beforeEach(function() {
    // Em breve não haverá essa path
    browser.get('http://0.0.0.0:8000/#/curriculo/identificacao');
  });


  it('Verifica se as validações estão funcionando', function() {
    limparTodosCampos();

    nome.sendKeys('Emanuel Victor de Oliveira Fonseca');
    expect(btnSalvarInformacoes.getAttribute('disabled')).toBe('true');
    
    radioButtonGenero.sendKeys('MASCULINO');
    expect(btnSalvarInformacoes.getAttribute('disabled')).toBe('true');
    
    selectEstadoCivil.sendKeys('SOLTEIRO');
    expect(btnSalvarInformacoes.getAttribute('disabled')).toBe('true');


    inputNacionalidade.sendKeys('BRASILEIRA');
    //inputDataNascimento 
    inputRG.sendKeys('92360741');

    selectOrgaoExpedidor.sendKeys('PR');
    inputNomeMae.sendKeys('Valdina Maia de Oliviera Fonseca');
    inputNomePai.sendKeys('Israel Fonseca');
    inputTelefoneCelular.sendKeys('4599775730');
    inputTelefoneResidencial.sendKeys('4535771707');
    inputTelefoneComercial.sendKeys('4599788565');
    inputCEP.sendKeys('85862590');

    selectEstado.sendKeys('Paraná');
    selectCidade.sendKeys('Foz do Iguaçu');
    selectBairro.sendKeys('Três Lagoas');
    inputLogradouro.sendKeys('LOGRADOURO');
    inputNumero.sendKeys('923');
    inputComplemento.sendKeys('EM FRENTE AO CEMITÉRIO');
    // checkBoxPNE.sendKeys('true');
    // selectPNETipo.sendKeys('FISICO');
    radioButtonSituacaoAtual.sendKeys('1');
    selectDisponibilidade.sendKeys('MANHA');
    inputLINKCNPQ.sendKeys('HTTP://LATTES.CNPQ.BR/3381250923725891');
  });

  var limparTodosCampos = function(){
    nome.clear();
    // radioButtonGenero.clear();
    // selectEstadoCivil.clear();
    inputNacionalidade.clear();
    // inputDataNascimento.clear();
    inputRG.clear();
    // selectOrgaoExpedidor.clear();
    inputNomeMae.clear();
    inputNomePai.clear();
    inputTelefoneCelular.clear();
    inputTelefoneResidencial.clear();
    inputTelefoneComercial.clear();
    inputCEP.clear();
    // selectEstado.clear();
    // selectCidade.clear();
    // selectBairro.clear();
    inputLogradouro.clear();
    inputNumero.clear();
    inputComplemento.clear();
    // checkBoxPNE.clear();
    // selectPNETipo.clear();
    // radioButtonSituacaoAtual.clear();
    // selectDisponibilidade.clear();
    inputLINKCNPQ.clear();
  };


});
