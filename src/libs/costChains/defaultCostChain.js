/* db에서 받아서 data에 
* baseCost:, - (할인안된 최초 기본+시간당요금)
* 이 프로퍼티에도 값 넣어줘야함
*/
const defaultCostService = require('../../services/defaultCostService');
const CostChainBase = require('./costChainBase');

class defaultCostChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  calculateMinute(startTime, endTime) {
    const endTimeMs = new Date(endTime).getTime();
    const startTimeMs = new Date(startTime).getTime();

    const minutes = parseInt((endTimeMs - startTimeMs) / 60000);

    return minutes;
  }

	async calculateCost(data) {
		
		const { id, startTime, endTime } = await defaultCostService.getLatestHistoryOfUser(data.historyId);
    const { id, priceBase, pricePerMinute } = await defaultCostService.getAreaPrice(data.deerAreaId);
		
    const rideMinutes = this.calculateMinute(startTime, endTime);
    const defaultCost = priceBase + pricePerMinute * rideMinutes;

    data.baseCost = defaultCost;
    data.finalCost = defaultCost;

		return goToNextChain(data);
	}
}

module.exports.defaultCostChain = defaultCostChain;