var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");

gulp.task("sass", function() {
    gulp.src("./src/sass/**/*scss")
        .pipe(sass({
            includePaths: require('node-reset-scss').includePath
          }))
        .pipe(sass().on('error', sass.logError))//エラーで止まらないようにする
        .pipe(autoprefixer(['last 3 versions', 'ie >= 8', 'Android >= 4', 'iOS >= 8']))
        .pipe(gulp.dest("./src/css"));　//出力先
});

//JS圧縮
gulp.task('minifyjs', function() {
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
          .on('error', function(e){
      console.log(e)
      } )
        .pipe(gulp.dest('./src/js/'));
        // .pipe(gulp.dest('js')); 上書きする場合
});

//CSS圧縮
gulp.task('minifycss',["sass"], function() {
  return gulp.src("/src/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/css/'));
        // .pipe(gulp.dest('css')); 上書きする場合
});

// gulp.task("ejs", function() {
//   gulp.src(
//      ["./*.ejs",'!' + "./**/_*.ejs"] //参照するディレクトリ、出力を除外するファイル
//   )
//   .pipe(ejs())
//   .pipe(rename({extname: ".html"})) //拡張子をhtmlに
//   .pipe(gulp.dest("./")) //出力先
// });

gulp.task('webserver', function(){
  gulp.src('public')
  .pipe(webserver({
    livereload: true,
    open: true,
    port: 8000
  }));
});

gulp.task("production", ["minifycss","minifyjs"])

gulp.task("default", function() {
    gulp.watch("src/sass/**/*.scss",["sass"]);
    gulp.watch(["src/js/**/*.js","!js/min/**/*.js"],["sass"]);
    // gulp.watch(["./*.ejs",'!' + "./_*.ejs"],["ejs"]);
    gulp.src('src')
      .pipe(webserver({
        livereload: true,
        open: true,
        port: 8000
      }));
});


