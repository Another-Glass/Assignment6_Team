const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class forbiddenAreaFineChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInForbidden(endPoint) {
		try {
			const isForbidden = await historyService.isInForbidden(endPoint);
    	return isForbidden ? true : false
		} catch(err) {
			throw err;
		}
  }

	async calculateCost(data) { 
		try {
			if(this.isInForbidden(data.endPoint)) {
				data.finalCost = data.finalCost + 6000;
			}
			return await this.goToNextChain(data);
		} catch(err) {
			throw err;
		}
	}
}

module.exports.forbiddenAreaFineChain = forbiddenAreaFineChain;