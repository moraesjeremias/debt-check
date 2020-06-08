const express = require('express');
const routes = express.Router();
const debtController = require('../controller/debtController')

routes.get('/test', debtController.index);

module.exports = routes;
