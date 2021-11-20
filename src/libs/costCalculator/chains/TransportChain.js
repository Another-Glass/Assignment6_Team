const CostChainBase = require('../CostChainBase');
const historyService = require('../../../services/historyService');
const areaService = require('../../../services/areaService');
const {getTimeBetween} = require('../../../utils/time');
const configs = require('../../../configs');

// 30분이내 재사용시 기본료면제
class TransportChain extends CostChainBase {
  constructor(nextChain) {
    super(nextChain);
  }

  async calculateCost(data) {
    const previousEndTime = await historyService.getPreviousEndTime(data.userId, data.historyId);

    //이전 사용내역이 없을 경우 바로 넘김
    if(previousEndTime === undefined)
      return await this.goToNextChain(data);

    const durationMilliSec = getTimeBetween(previousEndTime, data.startTime)
    if (durationMilliSec <= configs.cost.transportTime) {
      const { priceBase } = await areaService.getAreaPrice(data.deerAreaId);
      data.finalCost -= priceBase;
    }

    return await this.goToNextChain(data);
  }
}

module.exports = TransportChain;
