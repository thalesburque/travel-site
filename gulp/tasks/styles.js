var gulp = require('gulp'),
postcss = require('gulp-postcss'), //player for other tools
autoprefixer = require('autoprefixer') // autoprefixer css code
cssvars = require('postcss-simple-vars'), //allows creation of css variables
nested = require('postcss-nested'), //nest css code to any browser
cssImport = require('postcss-import'), //allows css classes to be imported
mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css') //import from this css file
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer])) //allows these variables to run
    .on('error', function(errorInfo){
      console.log(errorInfo.toString()); //display error message
      this.emit('end'); //if an error accurs, watch task doesn't stop running
    })
    .pipe(gulp.dest('./app/temp/styles')); // to a new css file
});
