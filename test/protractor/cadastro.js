describe('Cadastro de estaudante', function() {

  
  var cpf = element(by.name('cpf'));
  var nome = element(by.name('name'));
  var email = element(by.name('email'));
  var senha = element(by.name('senha'));
  var confirmacaoSenha = element(by.name('confirmacao_senha'));
  var btnContinuarCadastro = element(by.name('btn_continuar_cadastro'));
  
  var msgAsSenhasNaoConferem = element(by.name('as_senhas_nao_conferem'));
  var msgASenhaDeveConterNoMinimo6Caracteres = element(by.name('a_senha_deve_ter_6_caracteres_minimos'));
  
  // var msgSuccess = element(by.name('success'));
  


  beforeEach(function() {
    browser.get('http://0.0.0.0:8000/#/cadastro');
  });


  it('Verifica se as validaçẽos estão funcionando', function() {
    
    cpf.sendKeys('070747629');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe('true');
    
    nome.sendKeys('Emanuel Victor de Oliveira Fonseca');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe('true');
    
    email.sendKeys('emanuelvic');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe('true');
    
    senha.sendKeys('123');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe('true');
    expect(msgASenhaDeveConterNoMinimo6Caracteres.isDisplayed()).toBe(true);
    
    senha.sendKeys('123456');
    confirmacaoSenha.sendKeys('1234567');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe('true');
    expect(msgAsSenhasNaoConferem.isDisplayed()).toBe(true);
    
    senha.clear();
    confirmacaoSenha.clear();

    senha.sendKeys('123456');
    confirmacaoSenha.sendKeys('123456');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe('true');
    expect(msgAsSenhasNaoConferem.isDisplayed()).toBe(false);

  });

  it('Teste cadastrando alguém inexistente', function() {

    cpf.sendKeys('07074762911');
    nome.sendKeys('Emanuel Victor de Oliveira Fonseca');
    email.sendKeys('emanuelvictor@msn.com');
    senha.sendKeys('123456');
    confirmacaoSenha.sendKeys('123456');
    expect(btnContinuarCadastro.getAttribute('disabled')).toBe(null);
    btnContinuarCadastro.click();
    // buscar pelo css = toast toast-success
    
    // element(by.className('toast-message').isDisplayed()).toBe(true);
    // expect(msgSuccess.isDisplayed()).toBe(true);

  });

  it('Teste cadastrando com CPF e email repetido', function() {

    cpf.sendKeys('07074762911');
    nome.sendKeys('Emanuel Victor de Oliveira Fonseca');
    email.sendKeys('emanuelvictor@msn.com');
    senha.sendKeys('123456');
    confirmacaoSenha.sendKeys('123456');
    btnContinuarCadastro.click(); 

// buscar pelo css = toast toast-error
    // element.all(by.name('fail')).then(function(mensagens) {
    //   expect(mensagens.length).toBe(2);
    //   expect(mensagens[0].getText()).toBe('Número do CPF já solicitado para cadastro');
    //   expect(mensagens[1].getText()).toBe('Endereço de Email já solicitado para cadastro');
    // });
  });

  it('Teste cadastrando com CPF repetido', function() {
    email.clear();
    email.sendKeys('emanuel.info@gmail.com');
    btnContinuarCadastro.click();    
    // buscar pelo css = toast toast-error
    // element.all(by.name('fail')).then(function(mensagens) {
    //   expect(mensagens.length).toBe(1);
    //   expect(mensagens[0].getText()).toBe('Número do CPF já solicitado para cadastro');
    // });
  });

  it('Teste cadastrando com email repetido', function() {
    email.clear();
    email.sendKeys('emanuelvictor@msn.com');
    cpf.clear();
    cpf.sendKeys('07074762912');
    btnContinuarCadastro.click();    
    // buscar pelo css = toast toast-error
    // element.all(by.name('fail')).then(function(mensagens) {
    //   expect(mensagens.length).toBe(1);
    //   expect(mensagens[0].getText()).toBe('Endereço de Email já solicitado para cadastro');
    // });
  });

  it('Teste cadastrando alguém inexistente depois das tentativas erradas', function() {
    
    email.sendKeys('emanuel.info@gmail.com');
    cpf.sendKeys('07074762912');
    nome.sendKeys('Emanuel Victor de Oliveira Fonseca');
    senha.sendKeys('123456');
    confirmacaoSenha.sendKeys('123456');
    btnContinuarCadastro.click();    
    // buscar pelo css = toast toast-success
    // expect(msgSuccess.isDisplayed()).toBe(true);

  });

  var limparTodosCampos = function(){
    cpf.clear();
    nome.clear();
    email.clear();
    senha.clear();
    confirmacaoSenha.clear();
  };


});
