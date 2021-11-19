const models = require('../models');
const logger = require('../utils/logger');

// 해당 지역의 기본요금과 분당요금 받아오기
exports.getAreaPrice = async areaId => {
  try {
    const areaPrice = await models.area.findOne({
      where: {
        id: areaId,
      },
      attributes: ['id', 'priceBase', 'pricePerMinute'],
    });
    return areaPrice;
  } catch (err) {
    throw err;
  }
};
