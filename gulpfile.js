const gulp = require('gulp');

const path = require('path');

const nodemon = require('gulp-nodemon');

const babel = require('gulp-babel');

const watch = require('gulp-watch');

const logger = require('gulp-logger');

const del = require('del');

const {
  generateScssStub,
  isStyleChanged
} = require('./build/gulp/generate-scss-stub');

let nodemonStream = null;

const { log, error } = console;

const rs = timeout => {
  if (nodemonStream) {
    nodemonStream.emit('restart', timeout);
  }
};

gulp.task('clean', () => del(['dist']));

gulp.task('compile-server-src', ['clean'], () =>
  gulp
    .src('./client/**/*.js')
    .pipe(
      logger({
        before: 'Starting code compiling...',
        after: 'Compiling complete!',
        showChange: true
      })
    )
    .pipe(babel())
    .pipe(gulp.dest('./dist/server'))
);

gulp.task('generate-style-stubs', ['compile-server-src'], () =>
  gulp
    .src('./client/**/*.scss')
    .pipe(generateScssStub())
    .pipe(gulp.dest('./dist/server'))
);

gulp.task('start-nodemon', ['compile-server-src'], done => {
  nodemonStream = nodemon({
    script: './server/app.js',
    watch: ['./server'],
    env: {
      BABEL_ENV: 'client',
      NODE_ENV: 'development'
    },
    done
  });

  nodemonStream
    .on('restart', () => {
      log('restarted!');
    })
    .on('crash', () => {
      error('Application has crashed!\n');
      rs(5); // restart the server in 10 seconds
    });
});

gulp.task('watch-server-src', () =>
  watch(['client/**/*.{js,scss}'], event => {
    const { path: filepath, dirname } = event;

    const relativePath = dirname.replace(path.dirname(__filename), '.');

    const destPath = relativePath.replace(
      `.${path.sep}client`,
      `.${path.sep}dist${path.sep}server`
    );

    const ext = path.extname(filepath);

    if (ext === '.scss' && isStyleChanged(filepath)) {
      const paths = [
        `${relativePath}/Container.js`,
        `${relativePath}/index.js`
      ];

      gulp
        .src(paths)
        .pipe(
          logger({
            before: 'Starting code compiling...',
            after: 'Compiling complete!',
            showChange: true
          })
        )
        .pipe(babel())
        .pipe(gulp.dest(destPath));

      gulp
        .src(filepath)
        .pipe(generateScssStub())
        .pipe(gulp.dest(destPath));

      rs();
    } else if (ext === '.js') {
      gulp
        .src(filepath)
        .pipe(
          logger({
            before: 'Starting code compiling...',
            after: 'Compiling complete!',
            showChange: true
          })
        )
        .pipe(babel())
        .pipe(gulp.dest(destPath));
    }
  })
);

gulp.task('default', [
  'generate-style-stubs',
  'start-nodemon',
  'watch-server-src'
]);
