var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect',function(){
	connect.server({
		host:'localhost',
		livereload:true
	});
})

gulp.task('allFiles',function(){
	gulp.src('examples/**/*.*')
		.pipe(connect.reload())
})

gulp.task('default',function(){
	gulp.run('connect')
	//gulp.run('html')


	gulp.watch('examples/**/*.*',function(){
		gulp.run('allFiles')
	})
})