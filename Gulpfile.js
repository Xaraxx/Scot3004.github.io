/**
 * Created by Meki on 2015.02.25..
 */

/* Get dependencies */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    newer = require('gulp-newer');

/* Set paths */

var paths = {
    /* Source paths */
    styles: ['resources/sass/main.scss'],
    scripts: [
        'resources/js/grayscale.js',
        'resources/js/main.js'
    ],
    vendor_scripts: [
        'resources/bower_components/jquery/dist/jquery.js',
        'resources/bower_components/jquery.easing/js/jquery.easing.js',
        'resources/bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    images: ['resources/img/**'],
    fonts: [
        'resources/bower_components/bootstrap/fonts/*',
        'resources/bower_components/font-awesome/fonts/*'
    ],

    /* Output paths */
    stylesOutput: 'assets/styles',
    scriptsOutput: 'assets/js',
    imagesOutput: 'assets/img',
    fontsOutput: 'assets/fonts'
};

/* Tasks */
gulp.task('css', function() {
    return sass(paths.styles,{ style: 'compressed' })
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.stylesOutput));
});


gulp.task('js', function() {

    return gulp.src(paths.vendor_scripts.concat(paths.scripts))
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scriptsOutput));
});

gulp.task('jshint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('img', function() {
    return gulp.src(paths.images)
        .pipe(newer(paths.imagesOutput))
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(paths.imagesOutput));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.fontsOutput));
});

gulp.task('clean', function() {
    del.sync([paths.stylesOutput, paths.scriptsOutput, paths.fontsOutput])
});

gulp.task('default', function() {
    gulp.start('clean','css','jshint', 'js', 'img', 'fonts');
});

gulp.task('compile', function() {
    gulp.start('css','jshint', 'js', 'img', 'fonts');
});