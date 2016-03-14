var gulp = require('gulp');
var umd = require('gulp-umd');
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
