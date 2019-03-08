const crypto = require('crypto');

const DES_ALGORITHM = 'des-cbc';

const createDesCipher = (key, iv = '') => {
  const cipher = crypto.createCipheriv(
    DES_ALGORITHM,
    Buffer.from(key.substring(0, 8)),
    Buffer.from(iv.substring(0, 8))
  );

  let buf = '';

  cipher.on('readable', () => {
    const tmp = cipher.read();

    if (tmp) buf += tmp.toString('hex');
  });

  return data => {
    cipher.write(data);
    cipher.end();

    return new Promise(resolve => {
      cipher.on('end', () => {
        resolve(buf.toUpperCase());
      });
    });
  };
};

const createDesDecipher = (key, iv = '') => {
  const cipher = crypto.createDecipheriv(
    DES_ALGORITHM,
    Buffer.from(key.substring(0, 8)),
    Buffer.from(iv.substring(0, 8))
  );

  let buf = '';

  cipher.on('readable', () => {
    const tmp = cipher.read();

    if (tmp) buf += tmp.toString('utf-8');
  });

  return data => {
    cipher.write(data, 'hex');
    cipher.end();

    return new Promise(resolve => {
      cipher.on('end', () => {
        resolve(buf.toUpperCase());
      });
    });
  };
};

const sha256 = data =>
  crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');

const toBase64 = str => Buffer.from(str).toString('base64');

module.exports = { createDesCipher, createDesDecipher, sha256, toBase64 };
