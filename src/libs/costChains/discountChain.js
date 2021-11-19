const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class DiscountChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInParkingZone(endPoint) {
    try {
      const isParkingZone = await historyService.isInParkingZone(endPoint);
      return isParkingZone ? true : false
    } catch(err) {
      throw err;
    }
  }

	async calculateCost(data) {    
    try {
      if(this.isInParkingZone(data.endPoint)) {
        data.finalCost = data.finalCost * 0.7
      } 
      return await this.goToNextChain(data);
    } catch(err) {
      throw err;
    }  
	}
}

module.exports.DiscountChain = DiscountChain;

