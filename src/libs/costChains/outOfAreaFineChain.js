const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');
const dotenv = require('dotenv');
dotenv.config();

class OutOfAreaFineChain extends  CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInAllowedArea(deerAreaId, point) {
		try {
			
			return await historyService.isInAllowedArea(deerAreaId, JSON.stringify(point).replace('"','\"')); 
		} catch (err) {
			throw err;
		}   
  }

	async calculateCost(data){
		try {
			const isAllowedArea = await this.isInAllowedArea(data.deerAreaId, data.endPoint)
			
			if(!isAllowedArea.value) {
				data.finalCost = data.finalCost + (isAllowedArea.distance * Number(process.env.FINE_PER_METER));        
			}
			return await this.goToNextChain(data);
		} catch(err) {
			throw err;
		}
	}
}

module.exports.OutOfAreaFineChain = OutOfAreaFineChain;
