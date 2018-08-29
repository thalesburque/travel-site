var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'), //package for creating sprites
rename = require('gulp-rename'), //package that renames a file
del = require('del'); //package that delete folders

var config = { //Variable to config svgSprite
  mode: { //determines a mode for svgSprite
    css: { // creates a folder with a svg file
      sprite: 'sprite.svg', //name the file as sprite.svg
      render: { //generates css
        css: { //Specifies to be only css instead sass or ...
          template: './gulp/templates/sprite.css' //Provides information about any icon
        }
      }
    }
  }
}

gulp.task('beginClean', function() { //function that deletes folders containing old sprite files
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() { //create a sprite
  return gulp.src('./app/assets/images/icons/**/*.svg') //Import from this folder
    .pipe(svgSprite(config)) //Put all icons in a sigle svg file and create the css file
    .pipe(gulp.dest('./app/temp/sprite/')); //to this new folder
});

gulp.task('copySpriteGraphic', ['createSprite'], function() { //move the svg image to root image folder
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() { // Copy the css sprite file to the main style folder
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css')) //rename the css file to copy into the root folder
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']); //run all tasks listed
