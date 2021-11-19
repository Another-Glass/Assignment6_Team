const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class ParkingDiscountChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInParkingZone(endPoint) {
    try {
      const isParkingZone = await historyService.isInParkingZone(JSON.stringify(endPoint).replace('"','\"'));
      return isParkingZone.value
    } catch(err) {
      throw err;
    }
  }

	async calculateCost(data) {    
    try {
      if (await this.isInParkingZone(data.endPoint)) {
        data.finalCost = data.finalCost * 0.7
      }       
      
      return await this.goToNextChain(data);
    } catch(err) {
      throw err;
    }  
	}
}

module.exports.ParkingDiscountChain = ParkingDiscountChain;

