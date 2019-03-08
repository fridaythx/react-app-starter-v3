const fetchUtil = require('../util/fetchUtil');
const { uuidv4 } = require('../util/uuidUtil');

const forwardRequest = async (ctx, url, contentType = 'application/json') => {
  const reqId = uuidv4();

  try {
    const { method } = ctx;

    ctx.logger.info(`[${reqId}]${method} data from/to remote server`);

    ctx.logger.info(`[${reqId}]Forward to => ${url}`);

    const data = Object.keys(ctx.request.body).length
      ? ctx.request.body
      : ctx.query;

    ctx.logger.info(
      `[${reqId}]Forward request Query => ${JSON.stringify(ctx.query)}`
    );

    ctx.logger.info(
      `[${reqId}]Forward request Body => ${JSON.stringify(ctx.request.body)}`
    );

    const { sessid, requSeq, ...otherData } = data;

    const res = await fetchUtil[method.toLowerCase()](
      url,
      otherData,
      contentType,
      {
        sessid,
        requSeq
      }
    );

    ctx.logger.longInfo(
      `[${reqId}]Response data from remote server => ${JSON.stringify(res)}`
    );

    ctx.body = res;

    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    ctx.logger.error(`[${reqId}]Error occurred, ${e.message}`);
  }
};

module.exports = forwardRequest;
