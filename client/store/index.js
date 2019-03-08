import { END } from 'redux-saga';

import { isPrd } from '@util/envUtil';

import { initApp } from '../module/common/action';

import devStore from './store.dev.js';

import prdStore from './store.prd.js';

const createStore = (...args) => {
  const store = (isPrd() ? prdStore : devStore)(...args);

  store.initApp = (...payload) => {
    store.dispatch(initApp(...payload));
  };

  store.end = async () => {
    store.dispatch(END);

    await store.asyncTask;
  };

  return store;
};

export default createStore;
