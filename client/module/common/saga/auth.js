import { put, select, call } from 'redux-saga/effects';

import pathToRegexp from 'path-to-regexp';

import { isClient } from '@util';

import service from '../service';

import * as action from '../action';

const regexCache = {};

const loginPath = '/login';

function matchPath(clientPath) {
  return e => {
    if (!e) {
      return false;
    }

    let re = regexCache[e];

    if (!re) {
      re = pathToRegexp(e);

      regexCache[e] = re;
    }

    const matchedResult = re.exec(clientPath);

    return matchedResult && matchedResult.length > 0;
  };
}

function* loadAllowedPaths() {
  const { common } = yield select();

  const { clientInfo } = common;

  const allowedPaths = yield call(
    service.getUserAllowedPaths,
    clientInfo.cookie
  );

  yield put(
    action.setCommonState({
      allowedPaths
    })
  );
}

function* clearAllowedPaths() {
  yield put(action.setCommonState({ allowedPaths: [] }));
}

function* filterAuth() {
  const { common, router } = yield select();

  const { location } = router;

  const { clientInfo } = common;

  const { allowedPaths } = common;

  const pathname = location ? location.pathname : clientInfo.path;

  const found = allowedPaths.find(matchPath(pathname));

  if (!found && pathname !== loginPath) {
    if (isClient()) {
      yield put(action.navTo(loginPath));
    } else {
      yield put(action.redirectTo(loginPath));
    }
  }
}

export default { filterAuth, loadAllowedPaths, clearAllowedPaths };
