// json数据转换URL参数
const parseParam = (param, key) => {
  let paramStr = '';
  if (['string', 'number', 'boolean'].indexOf(typeof param) !== -1) {
    // paramStr += "&" + key + "=" + encodeURIComponent(param);
    paramStr += `&${key}=${param}`;
  } else {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-prototype-builtins */
    for (const i in param) {
      if (param.hasOwnProperty(i)) {
        const element = param[i];
        const k =
          key == null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`);
        paramStr += `&${parseParam(element, k)}`;
      }
    }
  }
  return paramStr.substr(1);
};

const request = async (url, data, method, contentType, headers) => {
  const domain =
    typeof window === 'undefined' ? process.env.domain : window.location.origin;

  if (typeof FormData === 'undefined' || !(data instanceof FormData)) {
    data = data ? JSON.stringify(data) : null;
  }

  if (contentType) {
    headers['content-type'] = contentType;
  }

  const res = await fetch(`${domain}${url}`, {
    headers,
    cache: 'no-cache',
    body: data,
    method,
    credentials: 'same-origin'
  });

  const resText = await res.text();

  try {
    return JSON.parse(resText);
  } catch (e) {
    console.error(
      `FetchUtil parse text to json failed, response text => ${resText}`
    );
    throw e;
  }
};

const post = (url, data = {}, contentType = 'application/json', headers = {}) =>
  request(url, data, 'post', contentType, headers);

const postFormData = (url, data = new FormData(), headers = {}) =>
  request(url, data, 'post', null, headers);

const get = (url, params, contentType = 'application/json', headers = {}) => {
  if (url.indexOf('?') !== -1) {
    // eslint-disable-next-line no-param-reassign
    url += `&${parseParam(params)}`;
  } else {
    // eslint-disable-next-line no-param-reassign
    url += `?${parseParam(params)}`;
  }
  return request(url, null, 'get', contentType, headers);
};
export { post, get, parseParam, postFormData };
