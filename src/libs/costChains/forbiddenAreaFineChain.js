const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class forbiddenAreaFineChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInForbidden(endPoint) {
    const isForbidden = await historyService.isInForbidden(endPoint);
    return isForbidden ? true : false
  }

	async calculateCost(data) { 
		if(this.isInForbidden(data.endPoint)) {
      data.finalCost = data.finalCost + 6000;
    }
		return await this.goToNextChain(data);
	}
}

module.exports.forbiddenAreaFineChain = forbiddenAreaFineChain;