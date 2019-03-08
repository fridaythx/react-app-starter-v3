/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducer';

import rootSaga from '../saga';

export default (preloadedState, history) => {
  /** support saga middleware for async flow */
  const sagaMiddleware = createSagaMiddleware();
  /** support router middleware */
  const routeMiddleware = routerMiddleware(history);

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(sagaMiddleware, routeMiddleware))
  );

  // return saga task promise
  store.asyncTask = sagaMiddleware.run(rootSaga).done;

  return store;
};
