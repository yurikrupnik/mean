/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/payments              ->  index
 * POST    /api/payments              ->  create
 * GET     /api/payments/:id          ->  show
 * PUT     /api/payments/:id          ->  update
 * DELETE  /api/payments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Payment from './payment.model';

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

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

function respondWithCount(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json({count: entity});
        }
    };
}

export function count(req, res) {
    console.log('req', req);

    return Payment.find().count().exec()
        .then(respondWithCount(res))
        .catch(handleError(res));
}


// Gets a list of Payments
export function index(req, res) {
    let {limit, include_total, page} = req.query;
    // limit(0) = gets all

    return Payment.find().limit(Number(limit)).exec()
        .then(function (response) {
            console.log('res', res);
            console.log('response', response);

            console.log('include_total', include_total);

            if (include_total === 'true') {
                return Payment.find().count().exec()
                    .then(function (res) {
                        return {
                            count: res,
                            data: response
                        };
                    });
            } else {
                // return null;
                return {
                    data: response
                };
                // return responseWithResult(res);
            }
        })
    //
    // )
        .then(respondWithResult(res))
        // .then()
        .catch(handleError(res));
}

// Gets a single Payment from the DB
export function show(req, res) {
    return Payment.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}


