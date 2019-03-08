const {
  renderToHtml,
  findMatch,
  createStore
} = require('../../dist/server/index.server');

const config = require('../../config');

const API_PREFIX = '/api/';

module.exports = (useServerRender = true) => {
  // add domain field onto process.env so that fetchUtil can use it to prefix requests's urls.
  process.env.domain = config.domain;

  return async (ctx, next) => {
    const state = {};

    if (useServerRender) {
      const { match, matchedRoute } = findMatch(ctx.path);

      if (!matchedRoute) {
        return next();
      }

      const store = createStore(state);

      store.initApp(ctx);

      if (typeof matchedRoute.Component.fetchInitData === 'function') {
        store.dispatch(
          matchedRoute.Component.fetchInitData({
            match,
            state: store.getState()
          })
        );
      }

      await store.end();

      const routerCtx = {};

      const html = renderToHtml(ctx.url, store, routerCtx);

      // there's a redirect action triggered from saga
      if (routerCtx.url) {
        ctx.status = 302;

        ctx.redirect(routerCtx.url);

        return null;
      }

      // wait for the promise's return
      await ctx.render('index.generated', {
        html,
        state: store.getState()
      });

      return null;
    } else if (!ctx.path.startsWith(API_PREFIX)) {
      const { matchedRoute } = findMatch(ctx.path);

      if (!matchedRoute) {
        return next();
      }

      ctx.logger.info('Use client route, fallback to index.generated.html');
      // wait for the promise's return
      await ctx.render('index.generated', {
        html: null,
        state
      });
      return null;
    }

    return next();
  };
};
