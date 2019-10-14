'use strict';

const express = require('express');
const router = express.Router();
const fusionsController = require('../controllers/fusionsController');

const controller = fusionsController();

//Handle incoming GET requests to /fusions
router.get('/', controller.get);

module.exports = router;
