const express = require("express");
const routes = require('../globals/routes');

const listingController = require('../controllers/listingController.js');

const listingRouter = express.Router();

// 유저 조회
listingRouter.get(routes.user, listingController.getAllUser);

// 이용내역 조회
listingRouter.get(routes.history, listingController.getAllHistory);

// 킥보드 조회
listingRouter.get(routes.deer, listingController.getAllDeer);

// 지역 조회
listingRouter.get(routes.area, listingController.getAllArea);

// 파킹존 조회
listingRouter.get(routes.parkingZone, listingController.getAllParkingZone);

// 반납금지구역 조회
listingRouter.get(routes.forbiddenArea, listingController.getAllForbiddenArea);

module.exports = listingRouter;