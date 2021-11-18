const models = require('../models');
const logger = require('../utils/logger');


//이용내역 가져오기
exports.readHistory = async historyId => {
  try {
    const history = await models.history.findOne({
      where: {
        id: historyId,
      },
    });
    return history;
  } catch (err) {
    throw err;
  }
};