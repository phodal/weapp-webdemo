var gulp = require('gulp'),
    exec = require('child_process').exec;

gulp.task('watch', function() {
    var watcher = gulp.watch('src/**/*.wxml');
    watcher.on('change', function(event) {
        var outputFileName = event.path.substring(0, event.path.length - 4) + 'js';
        outputFileName = outputFileName.replace('/src/', '/build/');
        var inputPath = event.path.replace(__dirname + '/', '');
        exec('./vendor/wcc -d ' + inputPath + ' > ' + outputFileName, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    });

    var wxssWatcher = gulp.watch('src/**/*.wxss');
    wxssWatcher.on('change', function(event) {
        var outputFileName = event.path.substring(0, event.path.length - 4) + 'css';
        outputFileName = outputFileName.replace('/src/', '/build/');
        var inputPath = event.path.replace(__dirname + '/', '');
        exec('./vendor/wcsc -d ' + inputPath + ' > ' + outputFileName, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    });
});
