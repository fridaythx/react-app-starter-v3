const logger = require('../util/logUtil');

module.exports = () => async (ctx, next) => {
  ctx.logger = logger;
  return next();
};
