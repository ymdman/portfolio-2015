gulp = require 'gulp'
jade = require 'gulp-jade'
stylus = require 'gulp-stylus'
browserify = require 'browserify'
glob = require 'glob'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
watch = require 'gulp-watch'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'
connect = require 'gulp-connect'
htmlhint = require 'gulp-htmlhint'
csslint = require 'gulp-csslint'
# jshint = require 'gulp-jshint'
coffeelint = require 'gulp-coffeelint'
csscomb = require 'gulp-csscomb'
cssbeautify = require 'gulp-cssbeautify'
autoprefixer = require 'gulp-autoprefixer'
spritesmith = require 'gulp.spritesmith'
minifyHTML = require 'gulp-minify-html'
minifyCSS = require 'gulp-minify-css'
uglify = require 'gulp-uglify'
copy = require 'gulp-copy'
imagemin = require 'gulp-imagemin'
pngquant = require 'imagemin-pngquant'
sourcemaps = require 'gulp-sourcemaps'

path =
  source: 'develop/source'
  build: 'develop/build'
  release: 'release'

gulp.task 'jade', ->
  gulp
    .src [
      "#{path.source}/jade/**/*.jade"
      "!#{path.source}/jade/**/_*.jade"
    ]
    .pipe plumber(
      errorHandler: notify.onError 'Error: <%= error.message %>'
    )
    .pipe jade
      pretty: true
      basedir: "#{path.source}/jade"
    .pipe gulp.dest "#{path.build}/"

gulp.task 'stylus', ->
  gulp
    .src [
      "#{path.source}/stylus/**/*.styl"
      "!#{path.source}/stylus/**/_*.styl"
    ]
    .pipe plumber(
      errorHandler: notify.onError 'Error: <%= error.message %>'
    )
    .pipe sourcemaps.init()
    .pipe stylus()
    .pipe autoprefixer
      browsers: [
        'iOS >= 8'
        'Android >= 4'
        'Chrome >= 30'
        'Safari >= 7'
        'Firefox >= 30'
        'Explorer >= 11'
      ]
      cascade: false
    .pipe cssbeautify()
    .pipe csscomb()
    .pipe sourcemaps.write('.')
    .pipe gulp.dest "#{path.build}/css/"

gulp.task 'browserify', ->
  # plumberが効かない為こちらで対応
  handleErrors = ->
    args = Array.prototype.slice.call arguments

    notify.onError
      title: 'Compile Error'
      message: '<%= error %>'
    .apply @, args

    @emit 'end'

  files = glob.sync "./#{path.source}/coffee/*.coffee"

  # エントリーポイントを複数登録するためのループ
  for i in files
    browserify
      entries: i
      extensions: '.coffee'
      debug: true
    .transform 'coffeeify'
    .bundle()
    .on 'error', handleErrors
    .pipe source i.replace(/.+\/(.+)\.coffee/g, '$1') + '.js'
    .pipe buffer()
    .pipe sourcemaps.init
      loadMaps: true
    .pipe sourcemaps.write()
    .pipe gulp.dest "#{path.build}/js/"

gulp.task 'coffeelint', ->
  gulp
    .src "#{path.source}/coffee/**/*.coffee"
    .pipe coffeelint '.coffeelintrc'
    .pipe coffeelint.reporter()
    .pipe notify (file) ->
      unless file.coffeelint.success
        file.relative + ' (' + file.coffeelint.results.length + ' errors)\n'

gulp.task 'sprite', ->
  files = glob.sync "./#{path.build}/**/sprite-master-*/"

  for i in files
    spriteData = gulp.src i + '*.png'
    .pipe spritesmith
      imgName: 'sprite.png'
      imgPath: i.replace(/.*build(.*)sprite-master.*\//g, '$1') + 'sprite.png'
      cssName: i.replace(/.+sprite-master-(.+)\//g, '_sprite-' + '$1') + '.styl'
      padding: 10
      retinaSrcFilter: i + '*-2x.png'
      retinaImgName: 'sprite-2x.png'
      retinaImgPath: i.replace(/.*build(.*)sprite-master.*\//g, '$1') + 'sprite-2x.png'
      
    spriteData.img
      .pipe(gulp.dest(i.replace(/(\.*)sprite-master.+\//g, '$1')))

    spriteData.css
      .pipe(gulp.dest("#{path.source}/stylus/pages/sprite/"))

gulp.task 'connect', ->
  connect.server
    root: path.build
    host: 'localhost'
    port: 3000
    livereload: true

gulp.task 'html', ->
  gulp
    .src "#{path.build}/**/*.html"
    .pipe htmlhint '.htmlhintrc'
    .pipe htmlhint.reporter()
    .pipe connect.reload()

gulp.task 'css', ->
  gulp
    .src "#{path.build}/css/**/*.css"
    .pipe csslint '.csslintrc'
    .pipe csslint.reporter()
    .pipe connect.reload()

gulp.task 'js', ->
  gulp
    .src [
      "#{path.build}/js/*.js",
      "!#{path.build}/js/lib/*.js"
    ]
    # .pipe jshint '.jshintrc'
    # .pipe jshint.reporter 'jshint-stylish'
    # .pipe notify 'Found file: <%= file.relative %>!'
    .pipe connect.reload()

gulp.task 'watch', ->
  gulp.watch "#{path.source}/jade/**/*.jade", ['jade']
  gulp.watch "#{path.source}/stylus/**/*.styl", ['stylus']
  gulp.watch "#{path.source}/coffee/**/*.coffee", ['coffeelint', 'browserify']
  gulp.watch "#{path.build}/**/*.html", ['html']
  gulp.watch "#{path.build}/css/**/*.css", ['css']
  gulp.watch "#{path.build}/js/**/*.js", ['js']

gulp.task 'minifyHTML', ->
  gulp
    .src "#{path.build}/**/*.html"
    .pipe minifyHTML()
    .pipe gulp.dest "#{path.release}/"

gulp.task 'minifyCSS', ->
  gulp
    .src "#{path.build}/css/**/*.css"
    .pipe minifyCSS()
    .pipe gulp.dest "#{path.release}/css/"

gulp.task 'uglify', ->
  gulp
    .src [
      "#{path.build}/js/**/*.js"
      "!#{path.build}/js/lib/*.js"
    ]
    .pipe uglify()
    .pipe gulp.dest "#{path.release}/js/"

gulp.task 'copy', ->
  gulp
    .src ["#{path.build}/js/lib/*.js", "#{path.build}/*.ico"], base: "#{path.build}"
    .pipe gulp.dest "#{path.release}/"

gulp.task 'imagemin', ->
  gulp
    .src [
      "#{path.build}/**/*.{png,jpg}"
      "!#{path.build}/**/sprite-master-*/*.{png,jpg}"
    ]
    .pipe imagemin
      progressive: true
      svgoPlugins: [
        removeViewBox: false
      ]
      use: [pngquant()]
    .pipe gulp.dest "#{path.release}/"


# 開発環境実行
gulp.task 'serve', ['connect', 'watch']

# minify実行
gulp.task 'min', ['minifyHTML', 'minifyCSS', 'uglify', 'copy', 'imagemin']