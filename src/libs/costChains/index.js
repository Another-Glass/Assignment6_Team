//모듈 importer index파일

const CostCalculator = require('./costCalculator');

let costCalculator = new CostCalculator();

module.exports = costCalulator;

//체인에 전달될 데이터
// data = {
// 	historyId:,
// 	userId:,
// 	useDeerName:,
// 	deerAreaId:, //킥보드 소유한 지역id
// 	baseCost:, //- 최초엔 0, defaultCostChains을 거치면 기본값 들어옴 (할인안된 최초 기본+시간당요금)
// 	finalCost:,
// 	startPoint:,  ///mysql의 ST_AsGeoJSON함수를 살펴볼것. 그 값 그대로 넣을예정
// 	endPoint:,
// 	startTime:,
// 	endTime:,
// }

//사용 예
//const costCalculator = require('../libs/costChains')
//let finalCost = costCalulator.calculateCost(data);