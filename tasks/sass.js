var gulp = require('gulp');

// var rubySass = require('gulp-ruby-sass');
var tasks = require('gulp-load-plugins')();

gulp.task('sass', function() {
  return gulp.src('sass/style.sass')
    .pipe(tasks.rubySass({sourcemap: true}))
    .pipe(gulp.dest('css'))
    .pipe(tasks.livereload({
      auto: false
    }));
});