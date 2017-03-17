var gulp = require('gulp');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var pkg = require('./package.json');
var babel = require('gulp-babel');
var notify = require("gulp-notify");


var errorHandler = {
    errorHandler: function (err) {
        console.log(err);
        this.emit('end');
    }
};

gulp.task("sass", function(){
  return gulp.src("src/sass/*.scss")
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(gulp.dest("src/build/css/"))
    .pipe(browserSync.reload({
      stream: true
  }));
});


gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('src/build/js/'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'js'], function() {
   gulp.watch("src/sass/*.scss", ["sass"]);
   gulp.watch("src/**/*.html", browserSync.reload);
   gulp.watch("src/js/*.js", ["js"]);
   gulp.watch("src/js/*.js", browserSync.reload);
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    });
});


// Run everything
gulp.task('default', ['sass', 'js', 'dev', 'browserSync']);
