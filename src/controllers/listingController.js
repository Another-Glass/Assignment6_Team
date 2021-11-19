const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const logger = require('../utils/logger');
const listingService = require('../services/listingService');

// 유저 조회
exports.getAllUser = async (req, res, next) => {
	try {
		const users = await listingService.readUserList();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.USERLIST_SUCCESS, users));
	} catch (err) {
		next(err);
	}
}

// 이용내역 조회
exports.getAllHistory = async (req, res, next) => {
	try {
		const histories = await listingService.readHistoryList();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.HISTORYLIST_SUCCESS, histories));
	} catch (err) {
		next(err);
	}
}

// 킥보드 조회
exports.getAllDeer = async (req, res, next) => {
	try {
		const deers = await listingService.readDeerList();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.DEERLIST_SUCCESS, deers));
	} catch (err) {
		next(err);
	}
}

// 지역 조회
exports.getAllArea = async (req, res, next) => {
	try {
		const areas = await listingService.readAreaList();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.AREALIST_SUCCESS, areas));
	} catch (err) {
		next(err);
	}
}

// 파킹존 조회
exports.getAllParkingZone = async (req, res, next) => {
	try {
		const parkingZones = await listingService.readParkingZoneList();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.PARKINGZONELIST_SUCCESS, parkingZones));
	} catch (err) {
		next(err);
	}
}

// 반납금지구역 조회
exports.getAllForbiddenArea = async (req, res, next) => {
	try {
		const forbiddenArea = await listingService.readForbiddenAreaList();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.FORBIDDENAREALIST_SUCCESS, forbiddenArea));
	} catch (err) {
		next(err);
	}
}