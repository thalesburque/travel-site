var gulp = require('gulp'),
watch = require('gulp-watch'), //watchs for some change
browserSync = require('browser-sync').create(); //update browser when any change accurs

gulp.task('watch', function () {

  // creates a server to run the page
  browserSync.init({
    notify: false, //doesn't show in the browser a popup informing some change
    server: {
      baseDir: "app"
    }
  });

  //when index.html is saved browser updates by itself
  watch('./app/index.html', function () {
    browserSync.reload();
  });

  //watch for css changes
  watch('./app/assets/styles/**/*.css', function () {
    gulp.start('cssInject');
  });

  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });

});

gulp.task('cssInject', ['styles'], function () {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});
