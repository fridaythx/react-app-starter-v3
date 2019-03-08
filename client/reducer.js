import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import { routerReducer } from 'react-router-redux';

import commonReducer from '@module/common/reducer';

import { importDynamicReducers } from '@util/dynamic-loader';

const reducers = importDynamicReducers();

export default combineReducers({
  module: combineReducers(reducers),
  common: commonReducer,
  form: formReducer,
  router: routerReducer
});
