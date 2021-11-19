const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const logger = require('../utils/logger');
const { ValidationError, EntityNotExistError, InternalServerError } = require('../utils/errors/commonError');
const historyService = require('../services/historyService');
const costCalculator = require('../libs/costChains');


//이용요금 계산
exports.getFinalCost = async (req, res, next) => {
	try {
		const historyId = req.params.historyId;

		if (!historyId || isNaN(historyId) || historyId.includes(' '))
			throw new ValidationError();
		// const isHistory = await getLatestHistoryOfUser(historyId);

		// if (!isHistory)
		// 	throw new EntityNotExistError();
		
		// const finalCost = await costCalculator.calculateCost(historyId);
		const finalCost = 1000;

		if (finalCost < 0)
			throw new InternalServerError();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.FINALCOST_SUCCESS, finalCost));
	} catch (err) {
		next(err);
	}
}
