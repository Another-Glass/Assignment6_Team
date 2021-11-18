const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const logger = require('../utils/logger');
const { ValidationError } = require('../utils/errors/commonError');
const historyService = require('../services/historyService')
//이용요금 계산
exports.getFinalCost = async (req, res, next) => {
	try {
		const historyId = req.params.historyId;
	} catch (err) {
		next(err);
	}
}
