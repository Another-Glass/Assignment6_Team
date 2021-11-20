const Sequelize = require('sequelize');
const configs = require('../configs');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const IS_SQLLITE = configs.db.isSqlite;

//sqlite 혹은 mysql 사용 설정
let sequelize;
if (IS_SQLLITE) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.db',
    logging: true,
  });
} else {
  sequelize = new Sequelize(
    configs.db.dbDATABASE,
    configs.db.dbUSERNAME,
    configs.db.dbPASSWORD,
    {
      host: configs.db.dbHOSTNAME,
      port: configs.db.dbPORT,
      dialect: 'mysql',
      logging: false,
    },
  );
}

//폴더 내의 모델 전부 불러오기
const modules = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    modules[model.name] = model;
  });

//모델의 관계설정
Object.keys(modules).forEach(modelName => {
  if (modules[modelName].associate) {
    modules[modelName].associate(modules);
  }
});

modules.sequelize = sequelize;
modules.Sequelize = Sequelize;

//DB연결
if (process.env.NODE_ENV !== 'test') {
  modules.sequelize
    .sync()
    .then(() => {
      logger.log('DB connected ...');
    })
    .catch(err => {
      logger.log('DB connection failed: ' + err);
    });
}

module.exports = modules;
