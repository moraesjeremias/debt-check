const express = require('express');
const routes = express.Router();

const DebtController = require('../controller/debtController')

routes.post(`/debits`, DebtController.getCarByRegion);
routes.post(`/orgaos`, DebtController.getCheckFederalAgencies);


module.exports = routes;
