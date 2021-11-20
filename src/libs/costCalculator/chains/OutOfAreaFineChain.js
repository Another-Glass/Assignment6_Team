const CostChainBase = require('../CostChainBase')
const historyService = require('../../../services/historyService');
const configs = require('../../../configs');
const logger = require('../../../utils/logger');

//지역을 벗어나서 반납하면 거리비례 벌금
class OutOfAreaFineChain extends  CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}

	async calculateCost(data) {
		const isInAllowedArea = await historyService.isInAllowedArea(
			data.deerAreaId,
			JSON.stringify(data.endPoint).replace('"', '\"')
		);

		if (!isInAllowedArea.value) {
			data.finalCost += (isInAllowedArea.distance * configs.cost.FINE_PER_METER);
		}
		return await this.goToNextChain(data);
	}
}

module.exports = OutOfAreaFineChain;
