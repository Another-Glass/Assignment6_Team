const logger = require("../../utils/logger");

//체인의 베이스 클래스. 단독사용금지
class CostChainBase {
	constructor(chain){
		this._nextChain = chain;
	}
	
	// 요금 계산 후 다음으로 넘김 or 바로 종료
	// 바로 종료할 경우 return data.finalCost; 을 사용
	async calculateCost(data){
			return await goToNextChain(data);
	}

	//다음 체인으로 이동
	async goToNextChain(data){
			logger.logWithTag('Chaining...currentCost is : '+data.finalCost, 'src:costChain')

			if(this._nextChain !== undefined) 
				return await this._nextChain.calculateCost(data)
			else
				return data.finalCost
	}

	addNext(chain){
		this._nextChain = chain
	}
}

module.exports = CostChainBase;