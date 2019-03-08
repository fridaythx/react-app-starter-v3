import { makeActionCreator } from '@util/reduxUtil';

/** Contants */
export const PREFIX = 'COMMON';

export const SHOW_MODAL = `${PREFIX}_SHOW_MODAL`;

export const NAV_TO = `${PREFIX}_NAV_TO`;

export const REDIRECT_TO = `${PREFIX}_REDIRECT_TO`;

export const SHOW_TOAST = `${PREFIX}_SHOW_TOAST`;

export const SHOW_MESSAGE = `${PREFIX}_SHOW_MESSAGE`;

export const CLEAR_MESSAGE = `${PREFIX}_CLEAR_MESSAGE`;

export const LOGIN = `${PREFIX}_LOGIN`;

export const INIT_APP = `${PREFIX}_INIT_APP`;

export const SET_COMMON_STATE = `${PREFIX}_SET_COMMON_STATE`;

export const SET_LOADING_STATE = `${PREFIX}_SET_LOADING_STATE`;

export const FILTER_AUTH = `${PREFIX}_FILTER_AUTH`;

export const CLEAR_ALLOWED_PATHS = `${PREFIX}_CLEAR_ALLOWED_PATHS`;

/** Actions */

export const showModal = makeActionCreator(SHOW_MODAL, 'visible');

export const navTo = makeActionCreator(NAV_TO, 'path', 'useReplace', 'option');

export const redirectTo = makeActionCreator(REDIRECT_TO, 'path');

export const showToast = makeActionCreator(SHOW_TOAST, 'msg', 'type', 'icon');

export const showMessage = makeActionCreator(SHOW_MESSAGE, 'msg', 'msgType');

export const clearMessage = makeActionCreator(CLEAR_MESSAGE);

export const initApp = makeActionCreator(INIT_APP, 'ctx');

export const setCommonState = makeActionCreator(SET_COMMON_STATE, 'state');

export const setLoadingState = makeActionCreator(SET_LOADING_STATE, 'visible');

export const moduleStateActionCreator = (moduleName = 'UNKNOW') => {
  const SET_MODULE_STATE = `SET_${moduleName}_MODULE_STATE`;

  return {
    SET_MODULE_STATE,
    setModuleState: makeActionCreator(SET_MODULE_STATE, 'state')
  };
};

export const filterAuth = makeActionCreator(FILTER_AUTH);

export const clearAllowedPaths = makeActionCreator(CLEAR_ALLOWED_PATHS);
