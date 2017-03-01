var gulp = require('gulp');

// server
var browerSync = require('browser-sync').create();
var reload = browerSync.reload;

// css
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');

// js
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// html
var htmlmin = require('gulp-htmlmin');

// image
var imagemin = require('gulp-imagemin');

// 去后缀
var through2 = require('through2');

// 缓存
var cache = require('gulp-cache');

// 清理
var clean = require('gulp-clean');

// md5
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// 同步
var runSequence = require('run-sequence');

// require
var amdOptimize = require("amd-optimize");

var concat = require("gulp-concat");

var rename = require('gulp-rename');


// 去掉后缀
function modify(modifier) {
	return through2.obj(function(file, encoding, done) {
		var content = modifier(String(file.contents));
		file.contents = new Buffer(content);
		this.push(file);
		done();
	});
}

function replaceJS(data) {
	return data.replace(/\.js/gmi, "");
}

function replaceCSS(data) {
	return data.replace(/\.css/gmi, "");
}

// 服务器
gulp.task('server', function() {
	browerSync.init({
		server: './src'
	});

	gulp.watch("./src/**/*.js", ['server:js']);
	gulp.watch("./src/**/*.scss", ['server:scss']);
	gulp.watch("./src/*.html", ['server:html']);
});

gulp.task('server:dist', function() {
	browerSync.init({
		server: './dist'
	});
});


// 服务器更新
gulp.task('server:js', function() {
	return gulp.src(['src/**/*.js', '!src/bower_components/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('server:scss', function() {
	return sass('./src/scss/index.scss')
		.on('error', sass.logError)
		.pipe(autoprefixer({
			browsers: ['last 4 version', 'Safari 5', 'ie 8', 'ie 9', 'Opera 12.1', 'iOS 6', 'Android 4']
		}))
		.pipe(gulp.dest('src/css'))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('server:html', function() {
	return gulp.src('src/*.html')
		.pipe(reload({
			stream: true
		}));
});


// build

// html
gulp.task('build:html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}))
		.pipe(gulp.dest('dist'));
});

// css
gulp.task('build:css', function() {
	return gulp.src(['src/css/*.css'])
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'Safari 5', 'ie 8', 'ie 9', 'Opera 12.1', 'iOS 6', 'Android 4']
		}))
		.pipe(cleancss({
			compatibility: 'ie8',
			keepSpecialComments: '*'
		}))
		.pipe(rev())
		.pipe(gulp.dest('dist/css'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('src/css'))
});

// 图片
gulp.task('build:img', function() {
	return gulp.src('src/**/*.{png,jpg,gif,ico,jpeg}')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(rev())
		.pipe(gulp.dest('dist'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('src/images'));
});

// js
gulp.task('build:js', function() {
	return gulp.src(['./src/js/*.js', '!./src/js/config.js'])
		.pipe(uglify({
			mangle: {
				except: ['require', 'exports', 'module', '$', 'define']
			}
		}))
		.pipe(rev())
		.pipe(gulp.dest('dist/js'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('src/js'))
});

gulp.task('build:component', function() {
	return gulp.src(['./src/js/**/*.js', '!./src/js/*.js'])
		.pipe(uglify({
			mangle: {
				except: ['require', 'exports', 'module', '$', 'define']
			}
		}))
		.pipe(rev())
		.pipe(gulp.dest('dist/js'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(modify(replaceJS))
		.pipe(gulp.dest('src/js/component'))
});

gulp.task('build:require', function() {
	return gulp.src('src/js/config.js')
		.pipe(uglify({
			mangle: {
				except: ['require', 'exports', 'module', '$', 'define']
			}
		}))
		.pipe(gulp.dest('dist/js'))
});

// 依赖
gulp.task('build:bower', function() {
	return gulp.src('./src/bower_components/**')
		.pipe(gulp.dest('dist/bower_components'))
});

gulp.task('build:font', function() {
	return gulp.src('src/css/fonts/*')
		.pipe(gulp.dest('dist/css/fonts/'))
})


// md5替换
gulp.task('replaceHTML', function() {
	gulp.src(['src/**/rev-manifest.json', 'dist/*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist'))
});

gulp.task('replaceCSS', function() {
	gulp.src(['src/images/rev-manifest.json', 'dist/**/*.css'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist'))
});

gulp.task('replaceJS', function() {
	gulp.src(['src/**/rev-manifest.json', 'dist/js/*.js'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist/js'))
});


// 清理
gulp.task('clean', function() {
	return gulp.src('dist/', {
			read: false
		})
		.pipe(clean());
});

gulp.task('default', ['clean'], function() {
	runSequence(['build:html', 'build:css', 'build:js', 'build:component', 'build:img', 'build:bower', 'build:require', 'build:font'], ['replaceCSS', 'replaceHTML', 'replaceJS']);
});