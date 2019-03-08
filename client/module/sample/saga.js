/* eslint-disable no-param-reassign */
import { takeLatest, all, select, call, put } from 'redux-saga/effects';

import * as action from './action';
import * as service from './service';

function* submit() {
  yield 1;
}

export default function*() {
  yield all([takeLatest(action.SUBMIT.REQUEST, submit)]);
}
