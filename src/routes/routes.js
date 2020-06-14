const express = require('express');
const routes = express.Router();

const DebtController = require('../controller/debtController')

routes.post(`/debits`, DebtController.getCarByRegion);
routes.post(`/agencies`, DebtController.getCheckFederalAgencies);
routes.post(`/debits-and-agencies`, DebtController.getDebitsAndFederalAgencies);


module.exports = routes;
