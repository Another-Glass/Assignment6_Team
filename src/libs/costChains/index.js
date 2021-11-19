//체인 설정파일
const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);
const chainFolderPath = __dirname + '/chains';

const CostCalculator = require('./costCalculator');
const logger = require('../../utils/logger');

//체인 모듈들을 자동 import
chains = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file !== 'costCalculator.js' &&
      file !== 'costChainBase.js' &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    chains[file.replace('.js', '')] = require(path.join(__dirname, file));
  });
logger.logWithTag('Chains : \n' + JSON.stringify(chains), 'src:costChain');

//체인 생성 및 연결
let costCalculator = new CostCalculator();
costCalculator.addChain(new chains['defaultCostChain'].DefaultCostChain());

module.exports = costCalculator;

//사용 예
//const costCalculator = require('../libs/costChains')
//let finalCost = await costCalulator.calculateCost(data);
