const express = require("express");
const routes = require('../globals/routes');

const historyController = require('../controllers/historyController.js');

const historyRouter = express.Router();

//이용 요금 계산
historyRouter.get(routes.historyDetail+routes.cost, historyController.getFinalCost);

module.exports = historyRouter;