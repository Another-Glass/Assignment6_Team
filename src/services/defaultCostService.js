const models = require('../models');
const logger = require('../utils/logger');

// 유저의 최신 사용기록 가져오기
exports.getLatestHistoryOfUser = async (historyId) => {
  try {
    const history = await models.history.findOne({
      where: {
        id: historyId,
      },
      attributes: ['id', 'startTime', 'endTime']
    });
    return history;
  } catch (err) {
    throw err;
  }
};

// 해당 지역의 기본요금과 분당요금 받아오기
exports.getAreaPrice = async (areaId) => {
  try {
    const areaPrice = await models.area.findOne({
      where: {
        id: areaId,
      },
      attributes: ['id', 'priceBase', 'pricePerMinute']
    });
    return areaPrice;
  } catch (err) {
    throw err;
  }
}