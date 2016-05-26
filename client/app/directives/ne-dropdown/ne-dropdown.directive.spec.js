'use strict';

describe('Directive: neDropdown', function () {

  // load the directive's module and view
  beforeEach(module('meanApp.ne-dropdown'));
  beforeEach(module('app/directives/ne-dropdown/ne-dropdown.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ne-dropdown></ne-dropdown>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the neDropdown directive');
  }));
});
