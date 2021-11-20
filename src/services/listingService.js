const models = require('../models');


// 모든 유저 가져오기
exports.readUserList = async () => {
	try {
		return await models.user.findAll();
	} catch (err) {
		throw err;
	}
};

// 모든 이용내역 가져오기
exports.readHistoryList = async () => {
	const HISTORY_QUERY = `SELECT id, ST_AsText(endPoint) AS endPoint, ST_AsText(startPoint) AS startPoint, startTime, endTime, deerId, userId FROM histories`;
	
	try {
		return await models.sequelize.query(HISTORY_QUERY, { type: models.sequelize.QueryTypes.SELECT });
	} catch (err) {
		throw err;
	}
};

// 모든 킥보드 가져오기
exports.readDeerList = async () => {
	try {
		return await models.deer.findAll();
	} catch (err) {
		throw err;
	}
};

// 모든 지역 가져오기
exports.readAreaList = async () => {
	const AREA_QUERY = `SELECT id, ST_AsText(boundary) AS boundary, ST_AsText(center) AS center, priceBase, pricePerMinute FROM areas`;
	
	try {
		return await models.sequelize.query(AREA_QUERY, { type: models.sequelize.QueryTypes.SELECT });
	} catch (err) {
		throw err;
	}
};

// 모든 파킹존 가져오기
exports.readParkingZoneList = async () => {
	const PARKING_ZONE_QUERY = `SELECT id, radius, ST_AsText(centerPoint) AS centerPoint FROM parkingzones`;
	
	try {
		return await models.sequelize.query(PARKING_ZONE_QUERY, { type: models.sequelize.QueryTypes.SELECT });
	} catch (err) {
		throw err;
	}
};

// 모든 반납금지구역 가져오기
exports.readForbiddenAreaList = async () => {
	const FORBIDDENAREA_QUERY = `SELECT id, ST_AsText(boundary) AS boundary FROM forbiddenAreas`;
	
	try {
		return await models.sequelize.query(FORBIDDENAREA_QUERY, { type: models.sequelize.QueryTypes.SELECT });
	} catch (err) {
		throw err;
	}
};