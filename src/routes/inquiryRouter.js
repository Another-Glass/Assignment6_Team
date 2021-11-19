const express = require("express");
const routes = require('../globals/routes');

const inquiryController = require('../controllers/inquiryController.js');

const inquiryRouter = express.Router();

// 유저 조회
inquiryRouter.get(routes.user, inquiryController.getAllUser);

// 이용내역 조회
inquiryRouter.get(routes.history, inquiryController.getAllHistory);

// 킥보드 조회
inquiryRouter.get(routes.deer, inquiryController.getAllDeer);

// 지역 조회
inquiryRouter.get(routes.area, inquiryController.getAllArea);

// 파킹존 조회
inquiryRouter.get(routes.parkingZone, inquiryController.getAllParkingZone);

// 반납금지구역 조회
inquiryRouter.get(routes.forbiddenArea, inquiryController.getAllForbiddenArea);

module.exports = inquiryRouter;