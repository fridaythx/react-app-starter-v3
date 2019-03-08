import { createReducer } from '@util/reduxUtil';

import {
  SHOW_MODAL,
  SET_COMMON_STATE,
  REDIRECT_TO,
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  SET_LOADING_STATE,
  SHOW_ALERT
} from './action';

const commonReducer = createReducer(
  {},
  {
    [SHOW_ALERT]: (state, { payload: { content, opts } }) => ({
      ...state,
      alertProps: { ...opts, content, isOpen: true }
    }),
    [SHOW_MODAL]: (state, { payload }) => ({
      ...state,
      modalVisible: payload
    }),
    [SHOW_MESSAGE]: (state, { payload }) => ({
      ...state,
      msg: payload.msg,
      msgType: payload.msgType
    }),
    [CLEAR_MESSAGE]: state => ({
      ...state,
      msg: null,
      msgType: null
    }),
    [REDIRECT_TO]: (state, { payload }) => ({
      ...state,
      redirectTo: payload.path
    }),
    [SET_LOADING_STATE]: (state, { payload }) => ({
      ...state,
      isLoading: payload.visible
    }),
    [SET_COMMON_STATE]: (state, { payload }) => ({
      ...state,
      ...payload.state
    })
  }
);
export default commonReducer;
