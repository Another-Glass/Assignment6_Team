const { getOwningArea } = require("../../services/deerService");
const { readHistory } = require("../../services/historyService");
const logger = require("../../utils/logger");

//체인 전체를 관리하는 매니저 클래스
class CostCalculator {
	constructor(){
		this._frontChain;
		this._rearChain;
		this.data;
	}

	//체인 추가
	addChain(chain){
		if(this._frontChain === undefined)
			this._frontChain = chain;

		if(this._rearChain !== undefined)
			this._rearChain.addNext(chain);

		this._rearChain = chain;
	}

	//체인 실행
	async calculateCost(historyId){
		this.data = await this.preprocessData(historyId);

		return await this._frontChain.calculateCost(this.data);
	}

	//체인 실행 전 필요한 데이터를 전처리
	async preprocessData(historyId){
			const history = await readHistory(historyId);
			const deerAreaId = await getOwningArea(history.deerId);

			let data = {	
				historyId: history.id,
				userId: history.userId,
				useDeerName: history.deerId,
				deerAreaId: deerAreaId, 				//킥보드 소유한 지역id
				baseCost: 0, 										//- 최초엔 0, defaultCostChains을 거치면 기본값 들어옴 (할인안된 최초 기본+시간당요금)
				finalCost: 0, 									//- 최초엔 0, defaultCostChains을 거치면 기본값 들어옴 (할인안된 최초 기본+시간당요금)
				startPoint: history.startPoint, ///mysql의 ST_AsGeoJSON함수를 살펴볼것. 그 값 그대로 넣을예정
				endPoint: history.endPoint,			///mysql의 ST_AsGeoJSON함수를 살펴볼것. 그 값 그대로 넣을예정
				startTime: history.startTime,
				endTime: history.endTime,
			}

			logger.logWithTag('Chain preprocessed data IS : '+ JSON.stringify(this.data), 'src:costChain')
			return data;
	}
}

module.exports = CostCalculator;