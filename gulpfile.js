const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const jasmine = require('gulp-jasmine');
 
gulp.task('jasmine', ['compile'], () => {
    gulp.src('build/test/*.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmine());
});



gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return del(["build/**/*"]);
});


const tsConfig = {
    //noImplicitAny: true,
    target: "es6",
    sourceMap: true,
    module: "commonjs"
    // declaration: true,

};

gulp.task( 'compilets', [], function() {
    return gulp.src( ['src/**/*.ts'
            ], 
            { base:"src" })
        //.pipe( sourcemaps.init() )
        .pipe(ts( tsConfig ))
        .js
        //.pipe( sourcemaps.write( "./maps" ) )
        .pipe(gulp.dest("build/"));
});


gulp.task('compile', [ 'compilets' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "web/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('default', [ 'jasmine' ], function() {
  // place code for your default task here
  //console.log( "Hello, World!" );
  //gulp.src( "web/**/*" ).pipe( gulp.dest( "build/" ) );
});

gulp.task('watchts', function () {
    // Endless stream mode 
    return gulp.watch('src/**/*.ts', [ 'compilets' ] );
});

gulp.task( 'watch', [ 'watchts' ], function() {
});

