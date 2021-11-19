const CostChainBase = require('./costChainBase');
const historyService = require('../../services/historyService');

// 1분 전에 사용했는지 확인
class FreeChain extends CostChainBase {
  constructor(nextChain) {
    super(nextChain);
  }

  async isInOneMinute(historyId) {
    try {
      const returnInOneMinute = await historyService.returnInMinute(historyId);
      return returnInOneMinute.value;
    } catch (err) {
      throw err;
    }
  }

  async calculateCost(data) {
    try {
      if (await this.isInOneMinute(data.historyId)) {
        data.finalCost = 0;
      }

      return await this.goToNextChain(data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports.FreeChain = FreeChain;
