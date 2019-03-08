/* eslint-disable */
require('css-modules-require-hook')({
  generateScopedName: '[local]_[sha1:hash:base64:5]',
  preprocessCss: require('../babel/sass-process'),
  prepend: [require('autoprefixer')],
  extensions: ['.scss', '.css']
});

const fs = require('fs');

const path = require('path');

const through = require('through2');

const getClasses = m => require(m);

const generateScssStub = () => {
  return through.obj((file, ext, streamCallback) => {
    const filepath = file.path;

    const destpath =
      path
        .relative(__dirname, filepath)
        .replace(
          `..${path.sep}..${path.sep}client`,
          `.${path.sep}dist${path.sep}server`
        ) + '.stub.json';

    const newClasses = JSON.stringify(getClasses(filepath));

    fs.writeFileSync(destpath, newClasses);

    streamCallback(null, null);
  });
};

const isStyleChanged = filepath => {
  const destpath =
    path
      .relative(__dirname, filepath)
      .replace(
        `..${path.sep}..${path.sep}client`,
        `.${path.sep}dist${path.sep}server`
      ) + '.stub.json';

  const exists = fs.existsSync(destpath);

  //compare to old file
  if (exists) {
    const newClasses = JSON.stringify(getClasses(filepath));

    const oldClasses = fs.readFileSync(destpath, { encoding: 'utf8' });

    // console.log('compare', filepath, destpath);

    // console.log('old content =>', oldClasses);

    // console.log('new content =>', newClasses);

    // console.log('need rs', newClasses !== oldClasses);

    return newClasses !== oldClasses;
  } else {
    // console.log('need rs', true);
    return true;
  }
};

module.exports = { generateScssStub, isStyleChanged };
