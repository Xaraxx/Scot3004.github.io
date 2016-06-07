/**
 * Created by Meki on 2015.02.25..
 */

/* Get dependencies */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    newer = require('gulp-newer'),
    spawn = require('child_process').spawn;

/* Set paths */

var paths = {
    /* Source paths */
    styles: ['_sass/main.scss'],
    scripts: [
        'resources/js/**'
    ],
    vendor_scripts: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery.easing/js/jquery.easing.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ],
    images: ['resources/img/**'],
    fonts: [
        'node_modules/bootstrap/fonts/*',
        'node_modules/font-awesome/fonts/*',
        'node_modules/devicons/fonts/*'
    ],

    /* Output paths */
    stylesOutput: 'css',
    scriptsOutput: 'js',
    imagesOutput: 'img',
    fontsOutput: 'fonts'
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
    del.sync([paths.scriptsOutput, paths.fontsOutput])
});

//Watch task
gulp.task('default',function() {
    gulp.watch('_sass/**/*.scss',['css']);
    gulp.watch(paths.images,['img']);
    gulp.watch(paths.scripts,['js']);
    gulp.watch(paths.fonts,['fonts']);
});

gulp.task('compile', function() {
    gulp.start('css', 'js', 'img', 'fonts');
});
