var gulp = require('gulp');
var react = require('gulp-react');
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
        './node_modules/marked/lib/marked.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/material-design-lite/material.js'
    ], './public/js/lib.js')
    .browserify('./src/js/app.jsx', './public/js/app.js')
    .browserify('./src/js/todo.jsx', './public/js/todo.js')
    .renderview()
    .browserSync({
        files: ['./public/**/*'],
        proxy: 'react-js.dev'
    });

});