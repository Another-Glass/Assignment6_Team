const defaultCostService = require('../../services/defaultCostService');
const CostChainBase = require('./costChainBase');

class DefaultCostChain extends CostChainBase {
  constructor(nextChain) {
    super(nextChain);
  }

  calculateMinute(startTime, endTime) {
    try {
      const endTimeMs = new Date(endTime).getTime();
      const startTimeMs = new Date(startTime).getTime();

      const minutes = parseInt((endTimeMs - startTimeMs) / 60000);

      return minutes;
    } catch (err) {
      throw err;
    }
  }

  async calculateCost(data) {
    try {
      const { startTime, endTime, ...rest1 } =
        await defaultCostService.getLatestHistoryOfUser(data.historyId);
      const { priceBase, pricePerMinute, ...rest2 } =
        await defaultCostService.getAreaPrice(data.deerAreaId);

      const rideMinutes = this.calculateMinute(startTime, endTime);
      const defaultCost = priceBase + pricePerMinute * rideMinutes;

      data.baseCost = defaultCost;
      data.finalCost = defaultCost;

      return await this.goToNextChain(data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports.DefaultCostChain = DefaultCostChain;