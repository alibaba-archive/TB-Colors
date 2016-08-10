var gulp       = require('gulp')
var jade       = require('gulp-jade')
var stylus     = require('gulp-stylus')
var rimraf     = require('gulp-rimraf')
var connect    = require('gulp-connect')
var sequence   = require('gulp-sequence')
var ghPages    = require('gulp-gh-pages')

var colors     = require('./src/colors')
var utils      = require('./src/utils')
var generators = require('./src/generators')

/* ==== Tasks ==== */
gulp.task('clean', function () {
  return gulp.src(['_gh_pages', 'dist'], {read: false})
    .pipe(rimraf({
      force: true
    }))
})

gulp.task('generator', function () {
  for (key in generators) {
    task = generators[key]
    task()
  }
})

gulp.task('docs-jade', function () {
  gulp.src('src/docs/**/*.jade')
    .pipe(jade({
      locals: {
        colors: colors,
        utils: utils
      },
      pretty: true
    }))
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

gulp.task('docs-style', function () {
  gulp.src('src/docs/*.styl')
    .pipe(stylus({
      'include css': true,
      'paths': ['./node_modules']
    }))
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

gulp.task('docs-script', function () {
  gulp.src('src/docs/**/*.js')
    .pipe(gulp.dest('_gh_pages/'))
    .pipe(connect.reload())
})

/* ==== Watch & Serve ==== */
gulp.task('watch', function () {
  gulp.watch('src/docs/**/*', ['docs'])
})

gulp.task('serve', ['watch'], function () {
  connect.server({
    root: '_gh_pages',
    port: 8001,
    livereload: true
  });
})

/* ==== Deploy ==== */
gulp.task('deploy', function() {
  gulp.src('_gh_pages/**/*')
    .pipe(ghPages())
})

/* ==== Task Quences ==== */
gulp.task('docs', function(callback) {
  sequence(
  'docs-jade',
  'docs-style',
  'docs-script'
  )(callback)
})

gulp.task('build', function(callback) {
  sequence(
  'clean',
  'generator',
  'docs'
  )(callback)
})

gulp.task('default', ['build'])
