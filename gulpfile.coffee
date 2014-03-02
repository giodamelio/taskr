http = require "http"

gulp = require "gulp"
gutil = require "gulp-util"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
stylus = require "gulp-stylus"
livereload = require "gulp-livereload"
ecstatic = require "ecstatic"

#### Precompilers #############################################################
# Compile the coffeescript
gulp.task "coffee", ->
    gulp.src("src/coffee/**/*.coffee")
        .pipe(coffee({bare:true}).on("error", gutil.log))
        .pipe(gulp.dest("out/js/"))
        .pipe(livereload())

# Compile the jade
gulp.task "jade", ->
    gulp.src("src/jade/**/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("out/views/"))
        .pipe(livereload())

# Compile the stylus
gulp.task "stylus", ->
    gulp.src("src/stylus/**/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("out/css/"))
        .pipe(livereload())

# Copy vendor files
gulp.task "vendor", ->
    gulp.src("src/vendor/**/*.*")
        .pipe(gulp.dest("out/vendor/"))

###############################################################################
#### Watch and Auto-recompile #################################################

gulp.task "watch", ->
    # Watch the coffee
    gulp.watch "src/coffee/**/*.coffee", ["coffee"]

    # Watch the jade
    gulp.watch "src/jade/**/*.jade", ["jade"]

    # Watch the stylus
    gulp.watch "src/stylus/**/*.styl", ["stylus"]

###############################################################################
#### Misc Tasks ###############################################################

gulp.task "server", ->
    http.createServer(ecstatic({ root: __dirname + "/out" })).listen(3141)
    console.log "Server started. http://localhost:3141/views/app.html"

###############################################################################
#### Exposed tasks ############################################################

# Run the dev enviroment
gulp.task "dev", ["coffee", "jade", "stylus", "vendor", "watch", "server"]

###############################################################################

