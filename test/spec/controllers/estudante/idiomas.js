'use strict';

describe('Controller: EstudanteIdiomasCtrl', function () {

  // load the controller's module
  beforeEach(module('portalSiteApp'));

  var EstudanteIdiomasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EstudanteIdiomasCtrl = $controller('EstudanteIdiomasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
