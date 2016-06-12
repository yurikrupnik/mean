'use strict';

describe('Service: csvService', function () {

    // load the service's module
    beforeEach(module('csv'));

    // instantiate service
    var csvService;
    beforeEach(inject(function (_csvService_) {
        csvService = _csvService_;
    }));

    it('should return', function () {
        expect(!!csvService).toBe(true);
    });

    it('should return correct fileName', function () {
        var fileName = 'random shit';
        expect(csvService.getFileName()).toBe('download'); // on init
        csvService.setFileName(fileName);
        expect(csvService.getFileName()).toBe(fileName); // after set
    });

});

describe('Controller: csvCtrl', function () {

    // load the service's module
    beforeEach(module('csv'));

    var scope, createController;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        createController = function () {
            return $controller('csvCtrl', {
                'ctrl': scope
            });
        };
    }));

    it('should return filename and handleClick', function () {
        var controller = createController();
        expect(!!controller.filename).toBe(true);
        expect(!!controller.handleClick).toBe(true);
    });

    it('should call handleClick', function () {
        var controller = createController();
        spyOn(controller, "handleClick");
        controller.handleClick();
        expect(controller.handleClick).toHaveBeenCalled();
    });

});

describe('Directive: csv', function () {
    beforeEach(module('csv'));
    beforeEach(module('app/directives/csv/csv.html'));

    var element, parentScope, elementScope;
    var compileDirective = function (template) {
        inject(function ($compile) {
            element = angular.element(template);
            element = $compile(element)(parentScope);
            parentScope.$digest();
            elementScope = element.isolateScope();
        });
    };
//
    beforeEach(inject(function ($rootScope) {
        parentScope = $rootScope.$new();
    }));

    it('should render csv directive', function () {
        compileDirective('<csv></csv>');
        expect(element.find('.text-right').length).toBeGreaterThan(0);
        expect(element.find('.csv-button').length).toBeGreaterThan(0);
    });
//
});
