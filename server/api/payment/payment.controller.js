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
    let {limit, page} = req.body;
    let gt = (page === 1) ? 0 : page * limit;
    let lt = gt + limit;
    return Payment.find({index: { $gt: gt, $lt: lt } }).exec()
        .then(function (response) {
            console.log('response.length', response.length);

            return {
                data: response
            };
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}


