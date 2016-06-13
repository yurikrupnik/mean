'use strict';

describe('grid', function () {

    // load the service's module
    beforeEach(module('grid'));
    beforeEach(module('app/directives/grid/grid.html'));

    // instantiate service
    var gridService, scope, createController;
    beforeEach(inject(function (_gridService_) {
        gridService = _gridService_;
    }));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createController = function() {
            return $controller('gridController', {
                'ctrl': scope
            });
        };
    }));



    var element, parentScope, elementScope;
    var compileDirective = function (template) {
        inject(function ($compile) {
            element = angular.element(template);
            element = $compile(element)(parentScope);
            parentScope.$digest();

            elementScope = element.isolateScope();
        });
    };


    it('should return', function () {
        var controller = createController();
        expect(!!gridService).toBe(true);
        expect(!!controller).toBe(true);
    });

    it('should return controller default props', function () {
        var controller = createController();
        expect(controller.gridOptions).toEqual(jasmine.any(Object));
        expect(controller.gridOptions.data).toEqual('ctrl.data');
        expect(controller.gridOptions).toEqual(jasmine.objectContaining({ columnDefs: jasmine.any(Array) }));
    });

    it('should test gridService', function () {
        expect(gridService.getConfig()).toEqual(jasmine.any(Object));
        var columnDefs = {columnDefs: [{a:1},{b:2}]};
        gridService.setConfig(columnDefs);
        expect(gridService.getConfig()).toEqual(jasmine.objectContaining({ columnDefs: jasmine.any(Array) }));
        expect(gridService.getConfig()).toEqual(jasmine.objectContaining(columnDefs));
    });
    
    it('should render grid directive', function () {
        // var controller = createController();
        // compileDirective('<grid></grid>');
        // var controller = createController();
        // controller.data = [{i: 1, a: 2, d: 3}];
        // console.log('element', element);

        // expect(element.find('.text-right').length).toBeGreaterThan(0);
        // expect(element.find('.csv-button').length).toBeGreaterThan(0);
    });
});

