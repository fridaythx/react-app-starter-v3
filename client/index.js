import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

import createStore from './store';

import createHistory from './history';

import App from './App';

// import registerServiceWorker from './registerServiceWorker';

const preloadedState =
  typeof window !== 'undefined' ? window.REDUX_PRELOADED_STATE : {};

const history = createHistory();

const store = createStore(
  /**
   * preloadedState
   */
  preloadedState,
  history
);

const renderDom = () => {
  const reactEle = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  const container = document.querySelector('#root');
  // we assume it is server side render if the preloadedState is not empty.
  if (preloadedState && Object.keys(preloadedState).length !== 0) {
    ReactDOM.hydrate(reactEle, container);
  } else {
    ReactDOM.render(reactEle, container);
  }
};

if (module.hot) {
  // enable MHR
  module.hot.accept('./App', () => renderDom());
}

renderDom();
