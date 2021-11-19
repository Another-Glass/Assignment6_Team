const CostChainBase = require('./costChainBase');
const historyService = require('../../services/historyService');

// 1분 전에 사용했는지 확인
class FreeChain extends CostChainBase {
  constructor(nextChain) {
    super(nextChain);
  }

  async isInOneMinute(historyId) {
    const returnInOneMinute = await historyService.returnInMinute(historyId);
    return returnInOneMinute.value;
  }

  async calculateCost(data) {
    if (this.isInOneMinute(data.historyId)) {
      data.finalCost = 0;
    }

    return await this.goToNextChain(data);
  }
}

module.exports.FreeChain = FreeChain;
