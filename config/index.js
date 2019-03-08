const { isDev } = require('../server/util/envUtil');

const gatewayCfg = require('./gatewaycfg');

const cipher = require('./cipher');

const logger = require('../server/util/logUtil');

const devConfig = {
  port: 3000,
  hotPort: 8088,
  domain: 'http://localhost:3000',
  useSSR: true,
  gateway: gatewayCfg,
  cipher: cipher.devConfig
};

const prdConfig = {
  port: 80,
  domain: 'http://localhost:80',
  useSSR: true,
  gateway: gatewayCfg,
  cipher: cipher.prdConfig
};

logger.info('NODE_ENV is', isDev() ? 'development' : 'production');

module.exports = isDev() ? devConfig : prdConfig;
