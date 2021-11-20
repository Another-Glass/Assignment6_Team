const CostChainBase = require('../CostChainBase')
const historyService = require('../../../services/historyService');
const configs = require('../../../configs');
const logger = require('../../../utils/logger');

//파킹존 반납시 30퍼센트 할인
class ParkingDiscountChain extends CostChainBase{
	constructor(){
		super()
	}

	async calculateCost(data) {    
    const isInParkingZone = await historyService.isInParkingZone(
      JSON.stringify(data.endPoint).replace('"','\"')
    );

    if (isInParkingZone.value) {
      data.finalCost -= (data.baseCost * configs.cost.PARKINGZONE_DISCOUNT_RATE)
    }       

    return await this.goToNextChain(data);
	}
}

module.exports = ParkingDiscountChain;

