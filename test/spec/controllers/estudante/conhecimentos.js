'use strict';

describe('Controller: EstudanteConhecimentoCtrl', function () {

  // load the controller's module
  beforeEach(module('portalSiteApp'));

  var EstudanteConhecimentoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EstudanteConhecimentoCtrl = $controller('EstudanteConhecimentoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
