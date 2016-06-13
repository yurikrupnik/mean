'use strict';

var app = require('../..');
import request from 'supertest';
//
// console.log('app', app);
// console.log('request', request);
//
//
// var newPayment;

describe('Payment API:', function () {

    var count;

    // beforeEach(function (done) {
    //     request(app)
    //         .get('/api/payments/')
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('shit', res.body);
    //
    //             count = res.body.count;
    //             done();
    //         });
    // });

    var data;
    var params = {
        limit: 100,
        page: 1
    };

    // beforeEach(function (done) {
    //     request(app)
    //         .post('/api/payments/', params, params)
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('shit', res);
    //
    //             data = res;
    //             done();
    //         });
    // });


    it('should do something', function () {
        // console.log('data', data);

    });

    it('should respond with JSON array', function () {
        // count.should.equal(0);
    });

});
