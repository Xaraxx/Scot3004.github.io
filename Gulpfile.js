/**
 * Created by Meki on 2015.02.25..
 */

/* Get dependencies */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    newer = require('gulp-newer');

/* Set paths */

var paths = {
    /* Source paths */
    styles: ['assets_src/sass/main.scss'],
    scripts: [
        'assets_src/bower_components/jquery/dist/jquery.js',
        'assets_src/bower_components/jquery.easing/js/jquery.easing.js',
        'assets_src/bower_components/bootstrap/dist/js/bootstrap.js',
        'assets_src/js/grayscale.js',
        'assets_src/js/main.js'
    ],
    images: ['assets_src/img/**'],
    fonts: [
        'assets_src/bower_components/bootstrap/fonts/*',
        'assets_src/bower_components/font-awesome/fonts/*'
    ],

    /* Output paths */
    stylesOutput: 'assets/styles',
    scriptsOutput: 'assets/js',
    imagesOutput: 'assets/img',
    fontsOutput: 'assets/fonts'
};

/* Tasks */
gulp.task('styles', function() {
    return sass(paths.styles,{ style: 'expanded' })
        .pipe(gulp.dest(paths.stylesOutput))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.stylesOutput))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.scriptsOutput))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scriptsOutput))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(newer(paths.imagesOutput))
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(paths.imagesOutput))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.fontsOutput))
    .pipe(notify({ message: 'Fonts task complete', onLast: true }));
});

gulp.task('clean', function(cb) {
    del([paths.stylesOutput, paths.scriptsOutput, paths.fontsOutput], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'fonts');
});