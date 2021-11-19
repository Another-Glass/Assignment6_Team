const CostChainBase = require('./costChainBase')
const historyService = require('../../services/historyService');

class forbiddenAreaFineChain extends CostChainBase{
	constructor(nextChain){
		super(nextChain)
	}
	
  async isInForbidden(endPoint) {
    const isForbidden = await historyService.isInForbidden(endPoint);
    return isForbidden ? true : false
  }

	calculateCost(data) { 
		if(this.isInForbidden(data.endPoint)) {
      data.finalCost = data.finalCost + 6000;
    }
		return this.goToNextChain(data);
	}
}

module.exports.forbiddenAreaFineChain = forbiddenAreaFineChain;

/*

반납금지 여부를 확인하여 반납금지 구역으로 확인되면

기본요금에 6000원 벌금 부과 */