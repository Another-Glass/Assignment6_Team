//체인을 관리하여 최종 사용하는 클래스
class CostCalculator {

	constructor(chain){
		this._frontChain = chain
		this._rearChain = chain
	}

	addChain(chain){
		this._rearChain.addNext(chain)
		this._rearChain = this._rearChain.nextChain
	}

	calculateCost(data){
		return this._frontChain.calculateCost(data);
	}
}

module.expots = CostCalculator;