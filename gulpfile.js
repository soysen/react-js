var gulp = require('gulp');
var react = require('gulp-react');
// var browserify = require('laravel-elixir-browserify-official');
var elixir = require('laravel-elixir');
var Task = Elixir.Task;

elixir.config.publicPath = 'public';
elixir.config.assetsPath = 'src';

elixir.extend('renderview', function() {
    new Task('renderview', function() {
        return gulp.src(['src/views/*.html'])
        .pipe(gulp.dest('public'))
    }).watch('./src/views/*');
});

elixir(function(mix){
    // browserify.init();

    mix
    .sass('./src/sass/app.sass', './public/css/app.css')
    .scripts([
        './node_modules/react/dist/react.js',
        './node_modules/react/dist/react-with-addons.js',
        './node_modules/react-dom/dist/react-dom.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/marked/lib/marked.js',
    ], './public/js/lib.js')
    .browserify('./src/js/app.js', './public/js/app.js')
    .renderview()
    .browserSync({
        files: ['./src/sass/**/*','./src/js/**/*','./public/**/*'],
        proxy: 'react-js.dev'
    });

});