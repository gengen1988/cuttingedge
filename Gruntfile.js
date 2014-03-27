module.exports = function (grunt) {
  var exec = require('child_process').exec;
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['cordova/www/*'],
    copy: {
      main: {
	expand: true,
	cwd: 'build/production/Boilerplate/',
        src: '**',
	dest: 'cordova/www/'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('compress', function () {
    var done = this.async();
    grunt.log.write('compress sencha app...');
    exec('sencha app build', {
      cwd: 'boilerplate'
    }, function (err, stdout, stderr) {
      grunt.log.ok();
      done();
    });
  });
  
  grunt.registerTask('compile', function () {
    var done = this.async();
    grunt.log.write('compile native package...');
    exec('cordova build', {
      cwd: 'cordova'
    }, function (err, stdout, stderr) {
      grunt.log.ok();
      done();
    });
  });
  
  grunt.registerTask('update', function () {
    var done = this.async();
    grunt.log.write('update android project...');
    exec('android update project -p cordova/platforms/android', function (err, stdout, stderr) {
      grunt.log.ok();
      done();
    });
  });

  grunt.registerTask('run', function () {
    var done = this.async();
    grunt.log.write('run without build...');
    exec('cordova run --nobuild', {
      cwd: 'cordova'
    }, function (err, stdout, stderr) {
      grunt.log.ok();
      done();
    });
  });
  
  grunt.registerTask('build', [
    'clean',
    'compress',
    'copy',
    'update',
    'compile'
  ]);

  grunt.regiserTask('test', ['build', 'run']);
  
}
