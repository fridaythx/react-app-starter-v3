const pubKey =
  '\n-----BEGIN PUBLIC KEY-----' +
  '\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRMAl4GmMHBMe2FAlwPAqX6Ckx' +
  '\n0xOtZJ0EjAXo95kv1leohZ4PoA+Jm3psqZqddLMdseKPAEN+PC08fDF2IvoY8x3a' +
  '\nO/B9Su5uxhZ/7kLacpcDtFfl+mAs5JHD6E7zN1CRwUpXKmucmmTT0m7rerooWOOT' +
  '\neN6c8NjgB7txFeEBsQIDAQAB' +
  '\n-----END PUBLIC KEY-----';

let instance = null;

function encrypt(data) {
  if (instance) {
    return instance.encrypt(data);
  }
  return null;
}

function decrypt(data) {
  if (instance) {
    return instance.decrypt(data);
  }
  return null;
}

if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  const { JSEncrypt } = require('jsencrypt');

  instance = new JSEncrypt();

  instance.setPublicKey(pubKey);

  window.JSEncrypt = JSEncrypt;
}

export default {
  encrypt,
  decrypt
};
