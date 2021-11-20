const CostChainBase = require('../CostChainBase')
const historyService = require('../../../services/historyService');
const configs = require('../../../configs');

//금지구역 반납시 6000원 벌금
class ForbiddenAreaFineChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}

	async calculateCost(data) { 
		const isForbidden = await historyService.isInForbidden(JSON.stringify(data.endPoint).replace('"','\"'));
		if(isForbidden.value) {
			data.finalCost += configs.cost.forbiddenAreaFine;
		}
		return await this.goToNextChain(data);
	}
}

module.exports = ForbiddenAreaFineChain;