var gulp = require('gulp'),
    consolidate = require('gulp-consolidate'),
    iconfont = require('gulp-iconfont'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    concat = require('gulp-concat'),
    brow_sync = require('browser-sync'),
    uglify = require('gulp-uglifyjs'),
    newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    tinypng = require('gulp-tinypng-compress'),
    cached = require('gulp-cached'),
    path = require('path'),
    remember = require('gulp-remember'),
    cssnext = require('postcss-cssnext'),
    rucksack = require('rucksack-css'),
    inlinesvg = require('postcss-inline-svg'),
    assets = require('postcss-assets'),
    precss = require('precss'),
    babel = require('gulp-babel'),
    syntax = require('postcss-scss'),
    del = require('del'),
    rename = require('gulp-rename');

gulp.task('vendor', function() {
  return gulp.src('dev/js/libs/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('iconfont', function () { // svg font

    var processors = [
        assets({
            loadPaths: ['dist/fonts/', 'dist/img/', 'dist/img_clients/'],
            basePath: 'dist/',
            relative: true
        })
    ]
    return gulp.src('dev/icons/*.svg')
        .pipe(iconfont({
            fontName: 'custom-icons',
            formats: ['ttf', 'eot', 'woff', 'woff2','svg'],
            appendCodepoints: true,
            appendUnicode: false,
            normalize: true,
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src('dev/css/template/*.css')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(gulp.dest('dev/css/'))
                .pipe(postcss(processors));

            gulp.src('dev/icons/template_html/index.html')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName
                }))
                .pipe(gulp.dest('dist/preview'));
        })
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('post-css', function () { // post css
    var processors = [
        precss({
            parser: 'postcss-scss'
        }),
        rucksack,
        inlinesvg,
        cssnext,
        assets({
            loadPaths: ['dist/fonts/', 'dist/img/', 'dist/img_clients/'],
            basePath: 'dist/',
            relative: true
        }),

        // cssnano


    ];

    return gulp.src('dev/css/*{.css,.scss}')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('brow_sync', function () { // browser sync
    brow_sync.init({
        server: 'dist'
    });
    brow_sync.watch('dist/**/*.*').on('change', brow_sync.reload);
});


gulp.task('watch', function () {
    gulp.watch('dev/css/*{.css,.scss}', ['post-css']);
    gulp.watch('dev/icons/**/*.svg', ['iconfont']);
    gulp.watch('dev/font/**/*.*', ['asset_font']);
    gulp.watch('dev/*.html', ['asset_html']);
    gulp.watch('dev/js/**/*.js', ['js']);
    gulp.watch('dev/**/*.{{.png,.jpg,.jpeg,.gif}}', ['accet_img'])

});

gulp.task('asset_html', function () {
    return gulp.src('dev/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('asset_img', function () {
    return gulp.src('dev/**/*{.png,.jpg,.jpeg,.gif}')
        .pipe(gulp.dest('dist'));

});

gulp.task('asset_font', function () {
    return gulp.src('dev/font/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

});

gulp.task('tinypng', function () {
    return gulp.src('dev/**/*.{png,jpg,jpeg}')
        .pipe(cached('tinypng'))
        .pipe(tinypng({
            key: 'spvfAakKRXcLDr_uaUsHSTd4FrR7Os6J',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(remember('tinypng'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src('dev/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bild.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});

gulp.task('del', function () {
    return del('dist');
});

gulp.task('default', ['iconfont', 'asset_font', 'post-css', 'asset_html', 'js', 'asset_img', 'brow_sync', 'watch']);

gulp.task('bild', ['del', 'tinypng', 'iconfont', 'asset_font', 'post-css', 'asset_html', 'js']);
