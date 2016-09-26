var gulp = require('gulp'),
    exec = require('child_process').exec;

gulp.task('watch', function() {
    var watcher = gulp.watch('src/**/*.wxml');
    watcher.on('change', function(event) {
        var outputFileName = event.path.substring(0, event.path.length - 4) + 'js';
        outputFileName = outputFileName.replace('/src/', '/build/');
        console.log(outputFileName);
        exec('./vendor/wcc -d ' + event.path + ' > ' + outputFileName, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    });
});
