var gulp = require('gulp');
// css
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
// js
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
// img
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// html
var htmlmin = require('gulp-htmlmin');
// 清理
var clean = require('gulp-clean');

// css
gulp.task('css', ['clean'], function() {
	gulp.src(['./sass/screen.scss'])
		.pipe(compass({
			config_file: './config.rb',
			css: 'css',
			sass: 'sass'
		}))
		.pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('./css'))
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('./dist/css'))
});

// js
gulp.task('js', ['clean'], function() {
	gulp.src('./js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
});

// image
gulp.task('img', ['clean'], function() {
	gulp.src('./image/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			multipass: true
		})))
		.pipe(gulp.dest('./dist/image'))
});

// html
gulp.task('html', ['clean'], function() {
	gulp.src('./*.html')
		.pipe(rev())
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}))
		.pipe(gulp.dest('./dist'));
});

// 清理
gulp.task('clean', function() {
	gulp.src(['./dist/js/*.js', './dist/image/*.{png,jpg,gif,ico}', './dist/css/*.css'], {
			read: false
		})
		.pipe(clean());
});

// 默认执行
gulp.task('default', ['js', 'img', 'html', 'css']);

// 看守
gulp.task('watch', function() {
	// 看守所有.scss档
	gulp.watch('./sass/screen.scss', ['css']);

	// 看守所有.js档
	gulp.watch('./js/*.js', ['js']);

	// 看守所有图片档
	gulp.watch('./image/*.{png,jpg,gif,ico}', ['img']);

	// 看守html
	gulp.watch('./*.html', ['html']);
});