const CostChainBase = require('../CostChainBase');
const configs = require('../../../configs');
const {getTimeBetween} = require('../../../utils/time');

// 1분 이내 사용 시 무료
class MalfunctionFreeChain extends CostChainBase {
  
  constructor(nextChain) {
    super(nextChain);
  }

  async calculateCost(data) {
    const rideMilliSec = getTimeBetween(data.startTime, data.endTime);

    if (rideMilliSec <= configs.cost.malfunctionRideTime) {
      return 0;
    }

    return await this.goToNextChain(data);
  }
}

module.exports = MalfunctionFreeChain;
