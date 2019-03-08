/* eslint-disable no-param-reassign */
import { takeLatest, takeEvery, all, put, call } from 'redux-saga/effects';

import { push, replace, LOCATION_CHANGE } from 'react-router-redux';

import { parseQueryStr, scrollTop, isClient } from '@util';

import * as action from '../action';

import { filterAuth, loadAllowedPaths, clearAllowedPaths } from './auth';

function* navTo({ payload: { path, useReplace, option } }) {
  if (useReplace) {
    yield put(replace(path, option));
  } else {
    yield put(push(path, option));
  }
  scrollTop(0);
}

// invoked when server rendering
function* initApp({ payload }) {
  const clientInfo = {};

  if (isClient()) {
    clientInfo.ua = window.navigator.userAgent;

    clientInfo.path = window.location.pathname;

    clientInfo.query = parseQueryStr(window.location.search);

    clientInfo.cookie = window.document.cookie;
  } else {
    const { ctx } = payload;

    const userAgent = ctx.headers['user-agent'];

    const { path, query } = ctx;

    clientInfo.ua = userAgent;

    clientInfo.path = path;

    clientInfo.query = query;

    clientInfo.cookie = ctx.headers.cookie;
  }

  yield put(
    action.setCommonState({
      clientInfo,
      loginState: {}
    })
  );

  // yield call(loadAllowedPaths);

  // yield call(filterAuth);
}

function* routeChange() {
  // yield call(filterAuth);
  // yield put(action.filterAuth());
}

export default function*() {
  yield all([
    takeLatest(action.NAV_TO, navTo),
    takeLatest(action.INIT_APP, initApp),
    takeEvery(action.FILTER_AUTH, filterAuth),
    takeLatest(LOCATION_CHANGE, routeChange),
    // clear allowed paths
    takeLatest(action.CLEAR_ALLOWED_PATHS, clearAllowedPaths)
  ]);
}
