const logger = require('../server/util/logUtil');

const deployEnv = process.env.DEPLOY_ENV;

const prd = {};

const pre = {};

const test = {};

const dev = {};

logger.info('DEPLOY_ENV is', deployEnv);

let gatewaycfg;

switch (deployEnv) {
  case 'TEST':
    gatewaycfg = test;
    break;
  case 'PRE':
    gatewaycfg = pre;
    break;
  case 'PRD':
    gatewaycfg = prd;
    break;
  case 'DEV':
    gatewaycfg = dev;
    break;
  default:
    logger.info('Unrecognized env param, fallback to PRD');
    gatewaycfg = prd;
}

module.exports = gatewaycfg;
