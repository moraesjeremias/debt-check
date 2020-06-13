const express = require('express');
const routes = express.Router();

const DebtController = require('../controller/debtController')

routes.post(`/debits/:state`, DebtController.getCarByRegion);

module.exports = routes;
