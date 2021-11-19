const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');
const dotenv = require('dotenv');
dotenv.config();

class ForbiddenAreaFineChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}

  async isInForbidden(endPoint) {
		try {
			const isForbidden = await historyService.isInForbidden(JSON.stringify(endPoint).replace('"','\"'));
    	return isForbidden.value
		} catch(err) {
			throw err;
		}
  }

	async calculateCost(data) { 
		try {
			if(await this.isInForbidden(data.endPoint)) {
				data.finalCost = data.finalCost + Number(process.env.FORBIDDEN_AREA_FINE);
			}
			return await this.goToNextChain(data);
		} catch(err) {
			throw err;
		}
	}
}

module.exports.ForbiddenAreaFineChain = ForbiddenAreaFineChain;