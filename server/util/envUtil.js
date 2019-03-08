const env = process.env.NODE_ENV;

const isDev = () => env === 'development';

const isPrd = () => !isDev();

module.exports = { env, isDev, isPrd };
