const express = require('express');
const routes = express.Router();
const debtController = require('../controller/debtController')

routes.get('/test', debtController.index);
routes.post('/check-debts/', debtController.retrieveQueriedDebt)

module.exports = routes;
