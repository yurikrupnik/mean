'use strict';

describe('grid', function () {

    // load the service's module
    beforeEach(module('grid'));

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
});

