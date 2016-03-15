var gulp = require('gulp');
var umd = require('gulp-umd');
var less = require('gulp-less');

gulp.task('default', function() {
    return gulp.src('src/*.js')
    	.pipe(umd({
			dependencies: function (file) {
				return [
                    {
			            name: 'seal-ui',
                        amd: 'jQuery',
                        cjs: 'jQuery',
                        global: 'jQuery',
                        param: '$'
				    },
                    {
    				  name: 'seal-ui',
    				  amd: 'SealModule',
    				  cjs: 'SealModule',
    				  global: 'SealModule',
    				  param: 'Module'
    				}
                ];
			}
		}))
    	.pipe(gulp.dest('build'));
});

gulp.task('layout', function() {
    var stream = gulp.src('./less/*.less')
        .pipe(less({
            //paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./build/css'));
    return stream;
});
gulp.task('dev', function() {
    var watcher = gulp.watch('./less/*.less', ['layout']);
    watcher.on('change', function(event) {
        console.log('[dev] File Less ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})
