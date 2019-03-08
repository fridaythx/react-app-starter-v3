import { makeAsyncActionCreator, createRequestTypes } from '@util/reduxUtil';
import { moduleStateActionCreator } from '@module/common/action';

export { setLoadingState, navTo, showToast } from '@module/common/action';

/** Contants */
export const PREFIX = '';

export const SUBMIT = createRequestTypes(`${PREFIX}_SUBMIT`);

/** Actions */
export const { SET_MODULE_STATE, setModuleState } = moduleStateActionCreator(
  PREFIX
);

export const submit = makeAsyncActionCreator(SUBMIT);
