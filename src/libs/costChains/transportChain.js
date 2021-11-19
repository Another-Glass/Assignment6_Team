const CostChainBase = require('./costChainBase');
const historyService = require('../../services/historyService');
const areaService = require('../../services/areaService');

class TransportChain extends CostChainBase {
  constructor(nextChain) {
    super(nextChain);
  }

  async isInTransportTime(userId, historyId) {
    try {
      const isInTransport = await historyService.isTransport(userId, historyId);

      return isInTransport.value;
    } catch (err) {
      throw err;
    }
  }

  async calculateCost(data) {
    try {
      if (await this.isInTransportTime(data.userId, data.historyId)) {
        const { priceBase } = await areaService.getAreaPrice(data.deerAreaId);

        data.finalCost -= priceBase;
      }

      return await this.goToNextChain(data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports.TransportChain = TransportChain;
