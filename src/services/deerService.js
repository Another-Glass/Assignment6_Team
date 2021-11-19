const models = require('../models');
const logger = require('../utils/logger');


//해당 킥보드를 소유한 지역 id 가져오기
exports.getOwningArea = async deerId => {
  try {
    const deerAreaId = await models.deer.findOne({
      where: {
        deerName: deerId,
      },
      attributes:['areaId'],
      raw:true,
    });
    return deerAreaId.areaId;
  } catch (err) {
    throw err;
  }
};