'use strict';

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();

router.get('/', controller.count);
router.post('/', controller.show);

module.exports = router;
