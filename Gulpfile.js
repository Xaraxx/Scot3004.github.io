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
    newer = require('gulp-newer'),
    csslint = require('gulp-csslint'),
    express = require('express'),
    spawn = require('child_process').spawn;

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = '_site/'

/* Set paths */

var paths = {
    /* Source paths */
    styles: ['_sass/main.scss'],
    scripts: [
        'resources/js/**'
    ],
    vendor_scripts: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery.easing/js/jquery.easing.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    images: ['resources/img/**'],
    fonts: [
        'bower_components/bootstrap/fonts/*',
        'bower_components/font-awesome/fonts/*'
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

gulp.task('csslint', function() {
   sass(paths.styles,{ style: 'expanded' })
    .pipe(csslint())
    .pipe(csslint.reporter());
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

// Run static file server
gulp.task('serve', function () {
    var server = express();
    server.use(express.static(EXPRESS_ROOT));
    server.listen(EXPRESS_PORT);
});

// Builds the static website with Jekyll
gulp.task('jekyll', ['compile'], function(done) {
    execute('jekyll build --future --destination '
        + path.join('..', websiteOutputDirectory), {
        cwd: websiteInputDirectory
    }, done);
});

function execute (cmd, opts, done) {
    util.log(util.colors.cyan(cmd));
    exec(cmd, opts,
        function (error, stdout, stderr) {
            util.log(util.colors.cyan(stdout));
            util.log(util.colors.red(stderr));
            done(error);
        }
    );
}

