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


//기본요금

/**
 * 30분 이내 환승이면 true, 아니면 false 반환
 * @param {사용자 아이디} userId 
 */ 
exports.isTransport = async (userId) => {
  const query = `
  SELECT 
	  HOUR(time_gap.diff) = 0 AND MINUTE(time_gap.diff) < 31
 	  AS inTime
  FROM 
  (
    SELECT 
      TIMEDIFF
      (
        (
          SELECT startTime 
          FROM histories 
          WHERE id = (SELECT id FROM (SELECT id, startTime, endTime FROM histories WHERE userId = :userId) user_only ORDER BY startTime DESC LIMIT 1)
        ), 
        (
          SELECT endTime 
          FROM histories 
          WHERE id = (SELECT id FROM (SELECT id, startTime, endTime FROM histories WHERE userId = :userId) user_only ORDER BY startTime DESC LIMIT 1 OFFSET 1)
        )
      ) AS diff	 
  ) time_gap    
  `
  try {
    let result = await models.sequelize.query(query,{
      replacements : {
        userId: userId
      },
      type: models.sequelize.QueryTypes.SELECT
    })
    let toReturn = {}
    
    if(result[0].inTime){
      toReturn.value = true
      return toReturn;
    } else {
      toReturn.value = false
      return toReturn;
    }
  } catch (err) {
    throw err
  }
  
}
/**
 * 1분 이내 사용이면 true, 아니면 false 반환
 * @param {사용내역 아이디} historyId 
 */
exports.returnInMinute = async (historyId) => {
  const query = `
  SELECT HOUR(time_gap.diff) = 0 AND MINUTE(time_gap.diff) < 1
 	 AS inMinute FROM (SELECT TIMEDIFF(startTime,endTime) AS diff FROM histories WHERE id = :historyId) time_gap
  `
  try {
    let result = await models.sequelize.query(query,{
      replacements : {
        historyId: historyId
      },
      type: models.sequelize.QueryTypes.SELECT
    })
    let toReturn = {}
    if(result[0].inMinute){
      toReturn.value = true
      return toReturn;
    } else {
      toReturn.value = false
      return toReturn;
    }
  } catch (err) {
    throw err
  }
}



//변동요금


exports.isInForbidden = async ()=>{

}

exports.isInAllowedArea = async ()=>{
  
}

exports.isInParkingZone = async ()=>{
  
}