module.exports = function (grunt) {
  var exec = require('child_process').exec;
  var domain = require('domain');
  
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

  var errorHandler = function (err, result, code) {
      if (err) {
        this(false);
        return;
      }
      grunt.log.ok();
      this();
  };
  
  grunt.registerTask('compress', function () {
    var done = this.async();
    grunt.log.writeln('compress sencha app...');

    grunt.util.spawn({
      cmd: 'sencha',
      args: ['app', 'build'],
      opts: {
        cwd: 'boilerplate',
        stdio: 'inherit'
      }
    }, errorHandler.bind(done));
  });
  
  grunt.registerTask('compile', function () {
    var done = this.async();
    grunt.log.writeln('compile native package...');

    grunt.util.spawn({
      cmd: 'cordova',
      args: ['build'],
      opts: {
        cwd: 'cordova',
        stdio: 'inherit'
      }
    }, errorHandler.bind(done));
  });
  
  grunt.registerTask('update', function () {
    var done = this.async();
    grunt.log.writeln('update android project...');
    grunt.util.spawn({
      cmd: 'android',
      args: ['update', 'project', '-s', '-p', '.'],
      opts: {
        cwd: 'cordova/platforms/android',
        stdio: 'inherit'
      }
    }, errorHandler.bind(done));
  });

  grunt.registerTask('run', function () {
    var done = this.async();
    grunt.log.writeln('run without build...');
    grunt.util.spawn({
      cmd: 'cordova',
      args: ['run', '--nobuild'],
      opts: {
        cwd: 'cordova',
        stdio: 'inherit'
      }
    }, errorHandler.bind(done));
  });

  grunt.registerTask('debug', function () {
    var done = this.async();
    grunt.log.writeln('running ddms...');
    grunt.util.spawn({
      cmd: 'monitor',
      opts: {
        stdio: 'inherit'
      }
    }, errorHandler.bind(done));
  });

  grunt.registerTask('web', function () {
    var done = this.async();
    grunt.log.writeln('running web server');
  });
  
  grunt.registerTask('build', [
    'clean',
    'compress',
    'copy',
    'update',
    'compile'
  ]);

  grunt.registerTask('test', ['build', 'run', 'debug']);

}
