var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    cache = require('gulp-cache'); // Подключаем библиотеку кеширования

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts-lib-js', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'node_modules/slick-carousel/slick/slick.css',
        ])
        .pipe(gulp.dest('app/js/library')); // Выгружаем в папку app/js
});

gulp.task('scripts-lib-css', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'node_modules/jquery/dist/jquery.js', // Берем jQuery
        'node_modules/slick-carousel/slick/slick.js',
        'app/js/main.js'
        ])
        .pipe(gulp.dest('app/js/library')); // Выгружаем в папку app/js
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        open: false,
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('build', ['clean', 'sass', 'scripts'], function() {
    
    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/main.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);