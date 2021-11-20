const chains = require('./chains');
const CostChainManager = require('./CostChainManager');


//체인 생성 및 연결
let costChainManager = new CostChainManager();

// 기본 확인사항
costChainManager.addChain(new chains['DefaultCostChain']());
costChainManager.addChain(new chains['MalfunctionFreeChain']());

// 벌금 부과
costChainManager.addChain(new chains['OutOfAreaFineChain']());
costChainManager.addChain(new chains['ForbiddenAreaFineChain']());

// 할인 혜택
costChainManager.addChain(new chains['ParkingDiscountChain']());
costChainManager.addChain(new chains['TransportChain']());

module.exports = costChainManager;
