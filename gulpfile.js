var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var src = {
	html: './*.html',
  scss: './sass/**/*.scss',
	js: './js/'
}

gulp.task('sass', function() {
	return gulp.src(src.scss)
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
});

gulp.task('watch', function() {
	gulp.watch([src.scss], ['sass']);
});

gulp.task('serve', function() {
	browserSync.init({
		open: false,
		files: [src.html, src.js],
		ghoseMode: false,
		notify: false,
		server: {
			baseDir: './'
		}
	});

	gulp.watch('js/**/*.js');
});

gulp.task('default', ['serve', 'watch']);
