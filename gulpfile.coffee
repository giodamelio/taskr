gulp = require "gulp"
gutil = require "gulp-util"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
stylus = require "gulp-stylus"

# Compile the coffeescript
gulp.task "coffee", ->
    gulp.src("src/coffee/**/*.coffee")
        .pipe(coffee({bare:true}).on("error", gutil.log))
        .pipe(gulp.dest("out/js/"))

# Compile the jade
gulp.task "jade", ->
    gulp.src("src/jade/**/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("out/views/"))

# Compile the stylus
gulp.task "stylus", ->
    gulp.src("src/stylus/**/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("out/css/"))

# Copy vendor files
gulp.task "vendor", ->
    gulp.src("src/vendor/**/*.*")
        .pipe(gulp.dest("out/vendor/"))

# Run the dev enviroment
gulp.task "dev", ["coffee", "jade", "stylus", "vendor"]

# child_process = require "child_process"
# fs = require "fs"
#
# gulp = require "gulp"
# gutil = require "gulp-util"
# coffee = require "gulp-coffee"
# mocha = require "gulp-mocha"
#
# safeps = require "safeps"
#
# # Compile the coffeescript
# gulp.task "coffee", ->
#    gulp.src("src/**/*.coffee")
#        .pipe(coffee().on("error", gutil.log))
#        .pipe(gulp.dest("lib/"))
#
# # Run the tests
# gulp.task "test", ["coffee"], ->
#    gulp.src("test/**/*.coffee")
#        .pipe(mocha({reporter: if process.env.REPORTER then process.env.REPORTER else "progress"}))
#
# # Run coverage test
# gulp.task "coverage", ["coffee"], ->
#    commands = [
#        "rm -rf lib-cov/ coverage.html", # Clean up from last time
#        "./node_modules/.bin/coffeeCoverage src/ lib-cov", # Instrument the source
#        "./node_modules/.bin/mocha --recursive --compilers coffee:coffee-script -R html-cov test/" # Write ethe coverage file
#    ]
#    commands =  commands.map((x)-> x.split(" "))
#
#    safeps.spawnMultiple commands, {env:{"COVERAGE": "yes"}}, (err, out) ->
#        fs.writeFile "coverage.html", out[2][1]
#
# # Clean the compiled files
# gulp.task "clean", ->
#    safeps.spawn "rm -rf lib/ lib-cov/ coverage.html".split(" ")
#
# # Watch and auto recompile the coffee
# gulp.task "watch", ->
#    gulp.run "coffee"
#    gulp.watch "src/**/*.coffee", ->
#        gulp.run "coffee"
#
# # This stops gulp from weird hanging bug
# # https://github.com/gulpjs/gulp/issues/167
# # gulp.on "stop", ->
# #     process.nextTick ->
# #         process.exit 0
