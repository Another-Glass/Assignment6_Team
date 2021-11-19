const models = require('../models');
const logger = require('../utils/logger');

//이용내역 가져오기
exports.readHistory = async historyId => {
  try {
    const history = await models.sequelize.query(
      'SELECT id, ST_AsGeoJson(endPoint) as endPoint,  ST_AsGeoJson(startPoint) as startPoint, startTime, endTime, deerId, userId FROM histories WHERE id = ?;',
      {
        replacements: [historyId],
        type: models.Sequelize.QueryTypes.SELECT,
      },
    );
    return history[0];
  } catch (err) {
    throw err;
  }
};

// 디어 사용시간 가져오기
exports.getHistoryTimes = async historyId => {
  try {
    const historyTimes = await models.history.findOne({
      where: {
        id: historyId,
      },
      attributes: ['id', 'startTime', 'endTime'],
    });
    return historyTimes;
  } catch (err) {
    throw err;
  }
};

//기본요금

/**
 * 30분 이내 환승이면 true, 아니면 false 반환
 * @param {사용자 아이디} userId 
 * @return {value : 30분 이내 재사용 여부}
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
  `;
  try {
    let result = await models.sequelize.query(query, {
      replacements: {
        userId: userId,
      },
      type: models.sequelize.QueryTypes.SELECT,
    });
    let toReturn = {};

    if (result[0].inTime) {
      toReturn.value = true;
      return toReturn;
    } else {
      toReturn.value = false;
      return toReturn;
    }
  } catch (err) {
    throw err;
  }
};
/**
 * 1분 이내 사용이면 true, 아니면 false 반환
 * @param {사용내역 아이디} historyId 
 * @return {value : 1분내 반납 여부}
 */
exports.returnInMinute = async historyId => {
  const query = `
  SELECT HOUR(time_gap.diff) = 0 AND MINUTE(time_gap.diff) < 1
 	 AS inMinute FROM (SELECT TIMEDIFF(startTime,endTime) AS diff FROM histories WHERE id = :historyId) time_gap
  `;
  try {
    let result = await models.sequelize.query(query, {
      replacements: {
        historyId: historyId,
      },
      type: models.sequelize.QueryTypes.SELECT,
    });
    let toReturn = {};
    if (result[0].inMinute) {
      toReturn.value = true;
      return toReturn;
    } else {
      toReturn.value = false;
      return toReturn;
    }
  } catch (err) {
    throw err;
  }
};

//변동요금

/**
 * 금지구역 반납 확인
 * @param {검사할 좌표의 geoJSON String} geoJSON
 * @return {value : 금지구역 포함 유무}
 */

exports.isInForbidden = async (geoJSON)=>{
  const query = `
  SELECT
    EXISTS (SELECT * FROM forbiddenAreas WHERE ST_INTERSECTS(boundary,ST_GeomFromGeoJSON(:geoJSON,1,0)))
  AS isForbidden    
  `

  try {
    let result = await models.sequelize.query(query,{
      replacements : {
        geoJSON: geoJSON
      },
      type: models.sequelize.QueryTypes.SELECT
    })
    let toReturn = {}
    if(result[0].isForbidden){
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
 * 활동구역 내 반납 확인
 * @param {검사할 좌표의 geoJSON String} geoJSON
 * @param {검사할 활동 지역의 ID}areaId
 * @return {value : 허용구역 내 포함 여부, distance : 허용구역 벗어났을시 거리}
 */
exports.isInAllowedArea = async (areaId,geoJSON)=>{
  const query = `
  SELECT	
    IF (ST_INTERSECTS(BOUNDARY,ST_GeomFromGeoJSON(:geoJSON,1,0)),
    0,
    ST_DISTANCE_SPHERE(center,ST_GeomFromGeoJSON(:geoJSON,1,0))	
    )
  AS distance	
  FROM 
	  areas 
  WHERE id = :areaId     
  `
  try {
    let result = await models.sequelize.query(query,{
      replacements : {
        areaId : areaId,
        geoJSON: geoJSON
      },
      type: models.sequelize.QueryTypes.SELECT
    })
    let toReturn = {}
    
    if(!result[0].distance){
      toReturn.value = true
      return toReturn;
    } else {
      toReturn.value = false
      toReturn.distance = result[0].distance
      return toReturn;
    }
  } catch (err) {
    throw err
  }  
}

/**
 * 주차구역내 반납 확인
 * @param {검사할 좌표의 geoJSON String} geoJSON
 * @return {value : 주차구역 내 포함 여부}
 */
exports.isInParkingZone = async (geoJSON)=>{
  const query = `
  SELECT
    EXISTS
    (
      SELECT id 
      FROM parkingzones 
      WHERE ST_DISTANCE_SPHERE(centerPoint,ST_GeomFromGeoJSON(:geoJSON,1,0)) < radius
    )
  AS inParkingZone
  `
  try {
    let result = await models.sequelize.query(query,{
      replacements : {
        geoJSON: geoJSON
      },
      type: models.sequelize.QueryTypes.SELECT
    })
    let toReturn = {}
    if(result[0].inParkingZone){
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
