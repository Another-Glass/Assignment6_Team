const CostChainBase = require('./costChainBase')

//1분 전에 사용했는지 확인
class FreeChain extends CostChainBase {
  constructor(nextChain) {
    super(nextChain)
  }

  calculateCost(data) {  /////-------사실상 여기만 건들면 됨
    //연산
    data.finalCost = 1;//연산결과

    // 여기서 끝낼경우 return data.finalCost; 을 사용
    return goToNextChain(data);
  }
}

class FreeChain2 extends CostChainBase { //예시. 또다른 계산조건이있으면
  constructor(nextChain) {
    super(nextChain)
  }

  calculateCost(data) {  /////-------사실상 여기만 건들면 됨
    //연산
    data.finalCost = 1;//연산결과

    // 여기서 끝낼경우 return data.finalCost; 을 사용
    return goToNextChain(data);
  }
}

module.exports.FreeChain = FreeChain;

module.exports.FreeChain2 = FreeChain2;