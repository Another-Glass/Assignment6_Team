//체인의 베이스 클래스. 단독사용금지
class CostChainBase {
	constructor(chain){
		this._nextChain= chain
	}
	
	calculateCost(data){
		return goToNextChain(data);
	}

	goToNextChain(data){
		if(nextChain !== undefined)
			return nextChain.calculateCost(data)
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