var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var gulp = require('gulp');
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

gulp.task('es6', function() {
	browserify({ debug: true })
		.transform(babelify)
		.require("src/js/index.js", { entry: true })
		.bundle()
		.on('error',gutil.log)
		.pipe(source('bundle.js'))
    	.pipe(gulp.dest('assets/'));
});


gulp.task('sass', function(){
  return gulp.src('src/sass/main.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('assets/'))
});

gulp.task('watch', function(){
  gulp.watch('src/sass/**/*.scss', ['sass']); 
  gulp.watch(['src/js/**/*.js'],['es6'])
});

gulp.task('default', ['es6', 'sass', 'watch']);