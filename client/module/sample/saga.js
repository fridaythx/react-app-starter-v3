/* eslint-disable no-param-reassign */
import { takeLatest, all, select, call, put, fork } from 'redux-saga/effects';

import * as action from './action';
import * as service from './service';

function* submit() {
  yield 1;
}

export default fork(function* saga() {
  yield all([takeLatest(action.SUBMIT.REQUEST, submit)]);
});
