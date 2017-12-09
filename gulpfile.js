const fileinclude = require('gulp-file-include'),
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	minify = require('gulp-minify'),
	cssmin = require('gulp-cssmin');

gulp.task('clean', function() {
		return gulp
		.src('./dist/*', { read: false })
		.pipe(clean({ force: true }));
});

gulp.task('copy', function() {
		return gulp
			.src([
				'./src/*',
				'./src/**/{/js/**/*.min.js,/css/**/*.min.css}',
				'./src/**/{/fonts/**/*,/img/**/*}',
				'!./src/**/*.inc.html'
			])
			.pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
	return gulp.src([
		'./src/**/*.js',
		'!./src/**/*.min.js'
	])
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(concat('all.js'))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('sass', function() {
	return gulp.src('./src/assets/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('html', function() {
		gulp.src([
			'./src/*.html',
			'!./src/*.inc.html'
		])
		.pipe(fileinclude({
				prefix: '@@',
				basepath: '@file'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('mini-js', function() {
	return gulp.src([
			'./src/**/*.js',
			'!./src/**/*.min.js'
		])
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('all.js'))
		.pipe(minify({
			ext: {
				min: '.js'
			},
			noSource: true
		}))
		.pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('mini-sass', function() {
	return gulp.src('./src/assets/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssmin())
		.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('debug', function() {
	runSequence('clean', 'copy', 'html', 'js', 'sass', function() {
		console.log('Finished');
	});
});

gulp.task('default', ['debug'], function() {
	gulp.watch('./src/**/*.html', ['debug']);
});

gulp.task('build', function() {
	runSequence('clean', 'copy', 'html', 'mini-js', 'mini-sass', function() {
		console.log('Build successfully');
	});
});
