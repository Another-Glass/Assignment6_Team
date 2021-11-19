//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER_SIGNUP = '/user';
const USER_SIGNIN = '/token';

const HISTORY = '/histories';
const HISTORY_DETAIL = '/:historyId';

const COST = '/cost';


const routes = {
  root: ROOT,
  history:HISTORY,
  historyDetail:HISTORY_DETAIL,
  cost:COST
}

module.exports = routes;



