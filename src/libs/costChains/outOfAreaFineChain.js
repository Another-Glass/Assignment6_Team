const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class outOfAreaFineChain extends  CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInAllowedArea(areaId, point) {
      return await historyService.isInAllowedArea(areaId, point); 
  }

	async calculateCost(data){
		if(!this.isInAllowedArea(data.areaId, data.endPoint).value) {
      data.finalCost = data.finalCost + this.isInAllowedArea(data.areaId, data.endPoint).distance * 100;        
    }
		
		return await this.goToNextChain(data);
	}
}

module.exports.outOfAreaFineChain = outOfAreaFineChain;
