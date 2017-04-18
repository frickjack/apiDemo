var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');


// register markdown support with nunjucks
var nunjucksManageEnv = function(env) {
    // The second argument can be any function that renders markdown 
    markdown.register(env, marked);
};

//var env = new nunjucks.Environment(new nunjucks.FileSystemLoader("."));
//markdown.register(env, marked);

//var tsProject = ts.createProject("tsconfig.json");
//var watch = require( 'gulp-watch' );


gulp.task('clean', [], function() {
  console.log("Clean all files in build folder");

  return del(["build/**/*"]);
});


var tsConfig = {
    //noImplicitAny: true,
    target: "es6",
    sourceMap: true
    // declaration: true
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

gulp.task('default', [ 'compile' ], function() {
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

