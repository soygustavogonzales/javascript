var gulp = require('gulp'),
	connect = require('gulp-connect'),

gulp.task('connect',function(){
	connect.server({
		host:'localhost',
		livereload:true
	});
})

gulp.task('html',function(){
	gulp.run('/**/*.html')
		.pipe(connect.reload())
})

gulp.task('default',function(){
	gulp.watch('/**/*.html',function(){
		gulp.run('html')
	})
})