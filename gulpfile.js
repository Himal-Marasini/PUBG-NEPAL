const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const cssimport = require('postcss-import');
// const normalize = require('normalize-css');


gulp.task('homepage', () => {
    return gulp.src('./assets/temp/css/homepage/style-homepage.css')
        .pipe(postcss([cssimport, autoprefixer, cssvars]))
        .pipe(gulp.dest('./styles'));
});

gulp.task('pubgform', () => {
    return gulp.src('./assets/temp/css/pubgform/style-pubgform.css')
        .pipe(postcss([cssimport, autoprefixer, cssvars]))
        .pipe(gulp.dest('./styles'));
});

gulp.task('loginHomepage', () => {
    return gulp.src('./assets/temp/css/loginHomepage/style-loginHomepage.css')
        .pipe(postcss([cssimport, autoprefixer, cssvars]))
        .pipe(gulp.dest('./styles'));
});

gulp.task('watch', function () {
    watch('./assets/temp/css', () => {
        gulp.start('homepage');
    });
});