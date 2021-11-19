const logger = require("../../utils/logger");

//체인의 베이스 클래스. 단독사용금지
class CostChainBase {
	constructor(chain){
		this._nextChain= chain
	}
	
	async calculateCost(data){
		return await goToNextChain(data);
	}

	async goToNextChain(data){
		if(this._nextChain !== undefined)
			return await this._nextChain.calculateCost(data)
		else
			return data.finalCost
	}

	addNext(chain){
		this._nextChain= chain
	}

  get nextChain(){
    return this._nextChain;
  }
}

module.exports = CostChainBase;