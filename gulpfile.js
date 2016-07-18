var gulp = require('gulp');
// css
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
// js
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
// img
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// html
var htmlmin = require('gulp-htmlmin');
// 清理
var clean = require('gulp-clean');

var useref = require('gulp-useref');
var rev = require('gulp-rev'); // 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');


// css
gulp.task('css', ['clean'], function() {
	sass('./src/scss/index.scss')
		.on('error', sass.logError)
		.pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('.src/css'))
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('./dist/src/css'))
});

// js
gulp.task('js', ['clean'], function() {
	gulp.src(['./src/js/lib/*.js', './src/js/component/*.js', './src/js/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('index.min.js'))
		.pipe(gulp.dest('./dist/src/js'))
});

// image
gulp.task('img', ['clean'], function() {
	gulp.src('./src/images/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			multipass: true
		})))
		.pipe(gulp.dest('./dist/src/images'))
});

// html
gulp.task('html', ['clean'], function() {
	gulp.src('./index.html')
		.pipe(useref())
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
	gulp.src(['./dist/src/js/*.js', './dist/src/image/*.{png,jpg,gif,ico}', './dist/src/css/*.css'], {
			read: false
		})
		.pipe(clean());
});

// 默认执行
gulp.task('default', ['js', 'img', 'html', 'css']);

// 看守
gulp.task('watch', function() {
	// 看守所有.scss档
	gulp.watch('./src/scss/index.scss', ['css']);

	// 看守所有.js档
	gulp.watch('./src/js/*.js', ['js']);

	// 看守所有图片档
	gulp.watch('./src/images/*.{png,jpg,gif,ico}', ['img']);

	// 看守html
	gulp.watch('./*.html', ['html']);
});