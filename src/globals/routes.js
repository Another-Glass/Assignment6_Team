//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER_SIGNUP = '/user';
const USER_SIGNIN = '/token';

// history
const HISTORY = '/histories';
const HISTORY_DETAIL = '/:historyId';
const COST = '/cost';

// listing
const LISTING = '/listing';
const USER = '/users';
const DEER = '/deers';
const AREA = '/areas';
const PARKING_ZONE = '/parkingzones';
const FORBIDDEN_AREA = '/forbiddenareas';

const routes = {
  root: ROOT,
  history: HISTORY,
  historyDetail: HISTORY_DETAIL,
  cost: COST,
  listing: LISTING,
  user: USER,
  deer: DEER,
  area: AREA,
  parkingZone: PARKING_ZONE,
  forbiddenArea: FORBIDDEN_AREA,
}

module.exports = routes;



