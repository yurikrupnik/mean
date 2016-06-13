'use strict';

describe('Service: thingsResource', function () {

    // load the service's module
    beforeEach(module('meanApp.thingsResource'));

    // instantiate service
    var thingsResource;
    beforeEach(inject(function (_thingsResource_) {
        thingsResource = _thingsResource_;
    }));

    // it('should do something', function () {
    //     expect(!!thingsResource).toBe(true);
    // });

});
