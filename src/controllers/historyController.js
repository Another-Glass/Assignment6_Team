const { statusCode, responseMessage } = require('../globals');
const { resFormatter } = require('../utils');
const logger = require('../utils/logger');
const { ValidationError, EntityNotExistError, InternalServerError } = require('../utils/errors/commonError');
const historyService = require('../services/historyService');
const costCalculator = require('../libs/costCalculator');

//이용요금 계산
exports.getFinalCost = async (req, res, next) => {
	try {
		const historyId = req.params.historyId;

		if (!historyId || isNaN(historyId))
			throw new ValidationError();

		const isHistory = await historyService.readHistory(historyId);
		if (!isHistory)
			throw new EntityNotExistError();
		
		const finalCost = await costCalculator.calculateCost(historyId);
		
		if (finalCost < 0)
			throw new InternalServerError();

		return res
			.status(statusCode.OK)
			.send(resFormatter.success(responseMessage.FINALCOST_SUCCESS, {cost:finalCost}));
	} catch (err) {
		next(err);
	}
}
