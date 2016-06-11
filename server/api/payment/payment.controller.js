/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/payments              ->  count
 * POST    /api/payments              ->  show
 */

'use strict';

import Payment from './payment.model';

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function respondWithResult(res, statusCode) {

    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}


// Gets a list Count
export function count(req, res) {
    return Payment.find().count().exec()
        .then(response => {
            return {count: response};
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a list of Payments Depend on page and limit body params
export function show(req, res) {

    function buildQueryByIndex(body) {
        let {limit, page, csv} = body;
        let gt, lt;
        if (csv && page >= 1) {
            gt = (page - 1) * limit; // example page=2 for csv, will pass index 1000+
        } else {
            gt = (page === 1) ? 0 : page * limit;
        }
        lt = gt + limit;

        return {index: {$gt: gt, $lt: lt}};
    }


    return Payment.find(buildQueryByIndex(req.body)).exec()
        .then(function (response) {
            return {
                data: response
            };
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}


