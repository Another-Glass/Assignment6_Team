const { getOwningArea } = require("../../services/deerService");
const { readHistory } = require("../../services/historyService");
const logger = require("../../utils/logger");

//체인을 관리하여 최종 사용하는 클래스
class CostCalculator {
	constructor(){
		this._frontChain;
		this._rearChain;
		this.data;
	}

	addChain(chain){
		if(this._frontChain === undefined)
			this._frontChain = chain;

		if(this._rearChain !== undefined)
			this._rearChain.addNext(chain);

		this._rearChain = chain;
	}

	async calculateCost(historyId){
		await this.preprocessData(historyId);
		return await this._frontChain.calculateCost(this.data);
	}

	async preprocessData(historyId){
		const history = await readHistory(historyId);
		const deerAreaId = await getOwningArea(history.deerId);

		this.data = {	
			historyId: history.id,
			userId: history.userId,
			useDeerName: history.deerId,
			deerAreaId: deerAreaId, //킥보드 소유한 지역id
			baseCost: 0, //- 최초엔 0, defaultCostChains을 거치면 기본값 들어옴 (할인안된 최초 기본+시간당요금)
			finalCost: 0,
			startPoint: history.startPoint,  ///mysql의 ST_AsGeoJSON함수를 살펴볼것. 그 값 그대로 넣을예정
			endPoint: history.endPoint,
			startTime: history.startTime,
			endTime: history.endTime,
		}
		logger.logWithTag('chain preprocessed data is : '+ JSON.stringify(this.data), 'src:costChain')
		
	}
}

module.exports = CostCalculator;