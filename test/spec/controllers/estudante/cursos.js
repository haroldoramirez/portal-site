'use strict';

describe('Controller: EstudanteCursosCtrl', function () {

  // load the controller's module
  beforeEach(module('portalSiteApp'));

  var EstudanteCursosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EstudanteCursosCtrl = $controller('EstudanteCursosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
