const logger = require('../util/logUtil');

class Cache {
  constructor() {
    this.cache = {};

    this.clearInvalidCache();
  }

  get(key) {
    const found = this.cache[key];

    if (found) {
      found.active = new Date().getTime();

      logger.info(
        `Found cache with key ${key}, and update active field to ${
          found.active
        }`
      );

      return found.value;
    }

    logger.info(`Cannot found cache with key ${key}`);

    return null;
  }

  set(key, value, expires = 600000) {
    logger.info(
      `Set new cache with key ${key} expires ${expires} value ${
        typeof value === 'object' ? JSON.stringify(value) : value
      }.`
    );

    this.cache[key] = { value, active: new Date().getTime(), expires };
  }

  clearInvalidCache() {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable guard-for-in */
    try {
      const now = new Date().getTime();

      for (const e in this.cache) {
        const next = this.cache[e];

        if (now - next.active >= next.expires) {
          delete this.cache[e];
          logger.info(`delete expired cache with key => ${e}`);
        }
      }
    } catch (e) {
      logger.info(`Clear cache error ${e.message}`);
    } finally {
      setTimeout(this.clearInvalidCache.bind(this), 1000);
    }
  }
}

const cache = new Cache();

module.exports = () => async (ctx, next) => {
  ctx.cache = cache;

  return next();
};
