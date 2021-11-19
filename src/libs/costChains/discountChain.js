const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class DiscountChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInParkingZone(endPoint) {
    const isParkingZone = await historyService.isInParkingZone(endPoint);
    
    if(isParkingZone) return true
    return false;
  }

	calculateCost(data) {    
    if(this.isInParkingZone(data.endPoint)) {
      data.finalCost = data.finalCost * 0.7
    } 
		return this.goToNextChain(data);
	}
}

module.exports.DiscountChain = DiscountChain;