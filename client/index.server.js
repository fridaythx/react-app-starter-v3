import 'isomorphic-fetch';

import React from 'react';

import { StaticRouter } from 'react-router';

import { Provider } from 'react-redux';

import ReactDOMServer from 'react-dom/server';

import { matchPath } from 'react-router-dom';

import createStore from './store';

import { routes } from './routes';

import App from './App';

const renderToHtml = (url, store, routerCtx = {}) =>
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={routerCtx}>
        <App />
      </StaticRouter>
    </Provider>
  );

const findMatch = path => {
  let match = null;

  const matchedRoute = routes.find(route => {
    match = matchPath(path, { exact: true, ...route });
    return match;
  });

  return {
    match,
    matchedRoute
  };
};

export default { renderToHtml, findMatch, createStore };
