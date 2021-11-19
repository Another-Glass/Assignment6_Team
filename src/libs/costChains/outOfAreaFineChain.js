const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class OutOfAreaFineChain extends  CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInAllowedArea(areaId, point) {
		try {
			return await historyService.isInAllowedArea(areaId, point); 
		} catch (err) {
			throw err;
		}   
  }

	async calculateCost(data){
		try {
			const isAllowedArea = await this.isInAllowedArea(data.areaId, data.endPoint)

			if(!isAllowedArea.value) {
				data.finalCost = data.finalCost + isAllowedArea.distance * 100;        
			}
			return await this.goToNextChain(data);
		} catch(err) {
			throw err;
		}
	}
}

module.exports.OutOfAreaFineChain = OutOfAreaFineChain;
