const historyService = require('../../../services/historyService');
const areaService = require('../../../services/areaService');
const CostChainBase = require('../CostChainBase');
const {getTimeBetween} = require('../../../utils/time');

//기본료 + 시간당 기본료
class DefaultCostChain extends CostChainBase {
  constructor() {
    super();
  }

  async calculateCost(data) {
    const { priceBase, pricePerMinute } = await areaService.getAreaPrice(
      data.deerAreaId,
    );
    
    const rideMinutes = parseInt(getTimeBetween(data.startTime, data.endTime) / 60000);
    const defaultCost = priceBase + pricePerMinute * rideMinutes;

    data.baseCost += defaultCost;
    data.finalCost += defaultCost;

    return await this.goToNextChain(data);
  }
}

module.exports = DefaultCostChain;
