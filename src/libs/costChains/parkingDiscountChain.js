const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');
const dotenv = require('dotenv');
dotenv.config();

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
        data.finalCost = data.finalCost - (data.baseCost * process.env.PARKINGZONE_RATE_DISCOUNT)
      }       
      return await this.goToNextChain(data);
    } catch(err) {
      throw err;
    }  
	}
}

module.exports.ParkingDiscountChain = ParkingDiscountChain;

