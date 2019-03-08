import { post, get } from '@util/fetchUtil';
import { call, put } from 'redux-saga/effects';
import * as action from './action';

function* callService(serviceUrl, actionCreator, postData, opts = {}) {
  const {
    showToast = true,
    onSuccess = () => {},
    onFailure = () => {},
    onFinal = () => {},
    method = 'post'
  } = opts;

  let resData = null;

  try {
    resData = yield call(method === 'post' ? post : get, serviceUrl, postData);
    yield* onSuccess(resData);
    yield put(actionCreator.success(resData));
  } catch (e) {
    if (showToast) {
      yield put(action.showToast(e.message));
    }
    yield* onFailure(resData);
    yield put(actionCreator.failure(resData));
  } finally {
    yield* onFinal();
  }
}

export default { callService, post, get };
