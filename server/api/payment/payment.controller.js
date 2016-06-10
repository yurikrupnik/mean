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


// Gets a list of Payments = Count
export function count(req, res) {
    return Payment.find().count().exec()
        .then(response => {
            return {count: response};
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Payment from the DB
export function show(req, res) {
    // let {page, limit, total} = req.query;
    // // limit(0) = gets all
    //
    //
    // let currentPage = Number(page);
    // let max = Number(limit);
    // let count = Number(total);
    // let start = 0; // todo find this
    // let end = 1+max;

    // let quert= req.query;
    return Payment.find({index: { $gt: 0, $lt: 200 } }).exec()
        .then(function (response) {
            return {
                data: response
            };
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}


