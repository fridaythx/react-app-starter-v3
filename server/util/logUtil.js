const log4js = require('log4js');
const delegate = require('delegates');
const config = require('../../config/log4js');

log4js.configure(config);

const logger = log4js.getLogger();

const longTextLogger = log4js.getLogger('long');

const logUtil = {
  logger,
  longTextLogger,
  log4js,
  longInfo: text => {
    logger.info(`${text.substr(0, 400)}${text.length > 400 ? '...' : ''}`);

    longTextLogger.info(text);
  }
};

delegate(logUtil, 'logger')
  .method('debug')
  .method('info')
  .method('warn')
  .method('error');

delegate(logUtil, 'log4js').method('getLogger');

module.exports = logUtil;
