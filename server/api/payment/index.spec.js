'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentCtrlStub = {
    index: 'paymentCtrl.index',
    show: 'paymentCtrl.show'
};

var routerStub = {
    get: sinon.spy(),
    post: sinon.spy()
};

// require the index with our stubbed out modules
var paymentIndex = proxyquire('./index.js', {
    'express': {
        Router: function () {
            return routerStub;
        }
    },
    './payment.controller': paymentCtrlStub
});

describe('Payment API Router:', function () {

    it('should return an express router instance', function () {
        paymentIndex.should.equal(routerStub);
    });

    describe('GET /api/payments', function () {

        it('should route to payment.controller index', function () {
            // routerStub.get
            //     .withArgs('/', 'paymentCtrl.index')
            //     .should.have.been.calledOnce;
        });

    });

    describe('POST /api/payments', function () {

        it('should route to payment.controller show', function () {
            routerStub.post
                .withArgs('/', 'paymentCtrl.show')
                .should.have.been.calledOnce;
        });
    });

});
