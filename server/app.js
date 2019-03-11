const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const views = require('koa-views');
const session = require('koa-session');
const koaWebpack = require('koa-webpack');
const compressible = require('compressible');
const webpackCfg = require('../build/dev.config.js');
const logger = require('./util/logUtil');
const servCfg = require('../config');
const withLogger = require('./middleware/logger');
const withCache = require('./middleware/memcache');
const render = require('./middleware/render');
const router = require('./router');
const { isPrd } = require('./util/envUtil');

const app = new Koa();

app.keys = ['portal'];

if (!isPrd()) {
  koaWebpack({
    config: webpackCfg,
    devMiddleware: {},
    hotClient: {
      port: servCfg.hotPort
    }
  }).then(middleware => {
    app.use(middleware);
  });
}

app.use(bodyParser());
app.use(
  compress({
    filter: type => !/event-stream/i.test(type) && compressible(type)
  })
);

// which directory will be public for app to reference to.
app.use(
  serve(path.resolve(__dirname, '../dist/client'), {
    defer: false,
    maxAge: isPrd() ? 180000 : 0
  })
);
// for convenience, mount logger object to ctx.
app.use(withLogger());
// use ejs as default template engine.
app.use(
  views(path.resolve(__dirname, '../dist/client'), {
    map: {
      html: 'ejs'
    },
    options: {
      delimiter: '$',
      cache: isPrd()
    }
  })
);
// use koa session
app.use(session(app));
app.use(withCache());
logger.info(`SSR enabled => ${servCfg.useSSR}`);
// enable server rendering.
app.use(render(servCfg.useSSR));
// mount routes.
app.use(router.routes());
app.use(router.allowedMethods());

logger.info(`Server is listening at port ${servCfg.port}`);

app.listen(servCfg.port);
