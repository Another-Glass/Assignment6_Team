const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class outOfAreaFineChain extends  CostChainBase{
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
			if(!this.isInAllowedArea(data.areaId, data.endPoint).value) {
				data.finalCost = data.finalCost + this.isInAllowedArea(data.areaId, data.endPoint).distance * 100;        
			}
			return await this.goToNextChain(data);
		} catch(err) {
			throw err;
		}
	}
}

module.exports.outOfAreaFineChain = outOfAreaFineChain;
