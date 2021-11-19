const express = require('express');
const routes = require('../globals/routes.js');

const listingController = require('../controllers/listingController.js');
const globalRouter = express.Router();

globalRouter.get(routes.root, function (req, res, next) {
  res.send("HelloWorld");
});

// 유저 조회
globalRouter.get(routes.user, listingController.getAllUser);

// 이용내역 조회
globalRouter.get(routes.history, listingController.getAllHistory);

// 킥보드 조회
globalRouter.get(routes.deer, listingController.getAllDeer);

// 지역 조회
globalRouter.get(routes.area, listingController.getAllArea);

// 파킹존 조회
globalRouter.get(routes.parkingZone, listingController.getAllParkingZone);

// 반납금지구역 조회
globalRouter.get(routes.forbiddenArea, listingController.getAllForbiddenArea);

module.exports = globalRouter;
