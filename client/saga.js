import { all, fork } from 'redux-saga/effects';

import commonSaga from '@module/common/saga';

import { importDynamicSagas } from '@util/dynamic-loader';

export default function*() {
  yield all([fork(commonSaga), ...importDynamicSagas()]);
}
