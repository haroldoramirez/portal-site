exports.config = {
  //Servidor selenium
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['cadastro.js', 'estudante.js'],
  // multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }]
}
