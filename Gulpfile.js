var gulp = require('gulp');
/*var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var qunit = require('gulp-qunit');*/

// This plugin will load all the plugins and set them to an object we can name here
var tasks = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

require('require-dir')('./tasks');

// This is one stream
gulp.task('uglify', function() {
  return gulp.src(['js/lib/*.js', 'js/*.js'])
    .pipe(tasks.concat('dist/js/app.js'))
    .pipe(tasks.uglify())
    .pipe(gulp.dest('.'));
});

/*gulp.task('sass', function() {
  return gulp.src('sass/style.sass')
    .pipe(tasks.rubySass({sourcemap: true}))
    .pipe(gulp.dest('css'))
    .pipe(tasks.livereload({
      auto: false
    }));
});*/

gulp.task('build', ['sass', 'uglify']);
// This is equivalent to above
/*gulp.task('build', function() {
  runSequence = ('sass', 'uglify');
  // Guaranteed order - if we had 'sass', 'uglify', ['thing1', 'thing2']
  // sass and uglify have to be sequential *then* the array but order of thing1 and 2 are not guaranteed
});*/

/*gulp.task('build', function() {
  runSequence(['sass', 'uglify'], 'watch');
});*/

// This is another stream
gulp.task('test', function() {
  return gulp.src('./test/*.html')
        .pipe(tasks.qunit());
});

// 'serve' is a depency and guarantees it's called (but not necessarily finished - it's just returned)
// if we had ['serve', 'something'] we are only guaranteed that the function won't run until both of these
// return, but not what order they run in
gulp.task('watch', ['serve'], function() {
  tasks.livereload.listen();
  gulp.watch('sass/*.sass', ['sass']);
});



gulp.task('serve', function() {
  tasks.connect.server({
    root: '.',
    port: 3000
  });
});

// If there was one big fat task that used all the plugins, it's one stream

gulp.task('default', ['test', 'build']);