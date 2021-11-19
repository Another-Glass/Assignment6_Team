const models = require('../models');
const logger = require('../utils/logger');


//이용내역 가져오기
exports.readHistory = async historyId => {
  try {
    const history = await models.sequelize.query(
      "SELECT id, ST_AsGeoJson(endPoint) as endPoint,  ST_AsGeoJson(startPoint) as startPoint, startTime, endTime, deerId, userId FROM histories WHERE id = ?;",
      { 
        replacements:[historyId],
        type: models.Sequelize.QueryTypes.SELECT 
      }
      );
    return history[0];
  } catch (err) {
    throw err;
  }
};