const env = process.env.NODE_ENV;

const isPrd = () => env === 'production';

const isDev = () => !isPrd();

export default { env, isDev, isPrd };
