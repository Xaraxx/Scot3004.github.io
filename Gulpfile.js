/**
 * Created by Meki on 2015.02.25..
 */

/* Get dependencies */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    newer = require('gulp-newer');

/* Set paths */

var paths = {
    /* Source paths */
    images: ['resources/img/**'],
   
    /* Output paths */
    imagesOutput: 'img'
};


gulp.task('img', function() {
    return gulp.src(paths.images)
        .pipe(newer(paths.imagesOutput))
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest(paths.imagesOutput));
});