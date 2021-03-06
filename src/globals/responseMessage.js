//응답 메시지 모음

module.exports = {
  SUCCESS: 'Request 성공',
  NULL_VALUE: '필요한 값이 없거나 잘못되었습니다.',
  OUT_OF_VALUE: '파라미터 값이 잘못되었습니다.',
  WRONG_INDEX: '잘못된 인덱스 접근입니다.',
  DB_ERROR: 'DB 오류',
  INTERNAL_SERVER_ERROR: '서버 오류입니다.',
  DUPLICATE_ERROR: '중복된 요청입니다.',
  PERMISSION_ERROR: '권한이 없습니다.',
  ENTITY_NOT_EXIST: "DB에 없는 데이터 관련 요청입니다.",
  NO_PAGE_ERROR: "해당 라우트는 존재하지 않습니다.",

  // finalCost
  FINALCOST_SUCCESS: '이용요금 조회 성공',

  // listing
  USERLIST_SUCCESS: '모든 유저 조회 성공',
  HISTORYLIST_SUCCESS: '모든 이용내역 조회 성공',
  DEERLIST_SUCCESS: '모든 킥보드 조회 성공',
  AREALIST_SUCCESS: '모든 지역 조회 성공',
  PARKINGZONELIST_SUCCESS: '모든 파킹존 조회 성공',
  FORBIDDENAREALIST_SUCCESS: '모든 반납금지구역 조회 성공',
};