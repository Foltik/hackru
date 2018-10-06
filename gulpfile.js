'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const es = require('event-stream');
const cleanCSS = require('gulp-clean-css');
const nodemon = require('gulp-nodemon');
const path = require('path');

const fileToTask = filename => {
    switch(path.extname(filename)) {
        case '.js': return 'MakeJS';
        case '.css': return 'MakeCSS';
        default: return;
    }
};

gulp.task('start', done => {
    nodemon({
        script: 'server.js',
        ignore: '*.*'
    });
    done();
});

gulp.task('watch', done => {
    nodemon({
        script: 'server.js',
        ext: 'js html css',
        env: {'NODE_ENV': 'dev'},
        watch: [
            'app/',
            'config/'
        ],
        tasks: (changedFiles = []) => [...(new Set(changedFiles.map(fileToTask)))]
    }).on('restart?', () => gulp.task('default')())
      .on('quit', () => done());
});

gulp.task('MinifyCSS', () => {
    const files = [
        {
            src: [
                'app/public/css/**/*.css',
                'app/public/css/*.css'
            ],
            dest: 'hackru.min.css'
        }
    ];

    const tasks = files.map(file =>
        gulp.src(file.src)
            .pipe(cleanCSS())
            .pipe(rename(file.dest))
            .pipe(gulp.dest('public/css')));

    return es.merge(tasks)
        .pipe(gulp.dest('public/css'));
});

gulp.task('MinifyJS', () => {
    const files = [
        {
            src: [
                'app/public/**/*.js',
                'app/public/*.js'
            ],
            dest: 'hackru.min.js'
        }
    ];

    const tasks = files.map(file =>
        gulp.src(file.src)
            .pipe(concat(file.dest))
            .pipe(uglify())
    );

    return es.merge(tasks)
        .pipe(gulp.dest('public/js'));
});

gulp.task('BrowserifyJS', () => {
    const files = [
        {
            src: 'public/js/hackru.min.js',
            dest: 'hackru.bundle.js'
        }
    ];

    const tasks = files.map(entry =>
        browserify({entries: [entry.src], debug: true}).bundle()
            .pipe(source(entry.dest))
    );

    return es.merge(tasks)
        .pipe(gulp.dest('public/js'));
});

gulp.task('MakeJS', gulp.series('MinifyJS', 'BrowserifyJS'));
gulp.task('MakeCSS', gulp.series('MinifyCSS'));

gulp.task('default', gulp.parallel('MakeJS', 'MakeCSS'));
