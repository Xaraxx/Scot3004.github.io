/**
 * Created by Meki on 2015.02.25..
 */

/* Get dependencies */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
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
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true}
                ]
            })
        ]
        ))
        .pipe(gulp.dest(paths.imagesOutput));
});
