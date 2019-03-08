import { post } from '@util/fetchUtil';

const getUserAllowedPaths = cookie => {
  const headers = { Cookie: cookie };
  return post('/api/paths-allowed', {}, 'application/json', headers);
};

export default { getUserAllowedPaths };
