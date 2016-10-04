'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin'),
  server = require('gulp-connect');

const srcPath = {
  'scss': './src/css/**/*.scss',
  'html': './src/view/**/*.html',
  'img': './src/img/**/*.*',
  'font': './src/font/**/*.*'
};

const publicPath = {
  'css': './public/css',
  'html': './public',
  'img': './public/img',
  'font': './public/font'
};

gulp.task('scss', () => {
  gulp.src(srcPath.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(concat('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(publicPath.css));
});

gulp.task('html', () => {
  gulp.src(srcPath.html)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(publicPath.html));
});

gulp.task('img', () => {
  gulp.src(srcPath.img)
    .pipe(imagemin())
    .pipe(gulp.dest(publicPath.img));
});

gulp.task('font', () => {
  gulp.src(srcPath.font)
    .pipe(gulp.dest(publicPath.font));
});


gulp.task('watch', function () {
  server.server({
    root: './public',
    livereload: true,
    port: 8000
  });

  gulp.watch(srcPath.sass, ['scss']);
  gulp.watch(srcPath.html, ['html']);
  gulp.watch(srcPath.img, ['img']);
  gulp.watch(srcPath.font, ['font']);
});

gulp.task('default', ['html', 'scss', 'img', 'font', 'watch']);