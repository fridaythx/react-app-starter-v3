import { createReducer } from '@util/reduxUtil';

import { SET_MODULE_STATE } from './action';

const reducer = createReducer(
  {},
  {
    [SET_MODULE_STATE]: (state, { payload }) => ({
      ...state,
      ...payload.state
    })
  }
);
export default reducer;
