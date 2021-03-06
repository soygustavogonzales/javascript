var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect',function(){
	connect.server({
		host:'localhost',
		livereload:true
	});
})

gulp.task('html',function(){
	gulp.src('examples/*.html')
		.pipe(connect.reload())
})

gulp.task('default',function(){
	gulp.run('connect')
	//gulp.run('html')


	gulp.watch('examples/*.html',function(){
		gulp.run('html')
	})
})