const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);
const logger = require('../../../utils/logger');

//체인 모듈들을 자동 import
modules = {};
chainNames = [];
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let name = file.replace('.js', '');
    chainNames.push(name);
    modules[name] = require(path.join(__dirname, file));
  });

logger.logWithTag('chains: ' + chainNames, 'src:costChain');

module.exports = modules;