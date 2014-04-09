module.exports = function (grunt) {
  var builder = require('./lib/builder');
  var exec = require('child_process').exec;
  var domain = require('domain');
  var context = grunt.file.readJSON('meta.json');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['cordova/www/*', 'build/*', 'sencha/app/*'],
    copy: {
      main: {
      	expand: true,
      	cwd: 'build/production/' + context.appname,
        src: '**',
      	dest: 'cordova/www/'
      }
    },
    watch: {
      templates: {
        files: 'src/**',
        tasks: ['convert'],
        options: {
          spawn: false,
          livereload: {
            port: 35729
          }
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 1841,
          hostname: '*',
          open: {
            target: 'http://localhost:1841/sencha'
          },
          middleware: function (connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            options.base.forEach(function(base) {
            // Serve static files.
              middlewares.push(connect.static(base));
            });
            // Make directory browse-able.
            middlewares.push(connect.directory(directory));
            middlewares.push(function (req, res, next) {
              if (req.url == '/sencha/cordova.js') {
                res.writeHead(200, {
                  'Content-Type': 'text/javascript'
                });
                res.end('console.warn("gg: 当前处于网页调试状态，所有设备功能将不可用")');
                return;
              }
              next();
            });
            return middlewares;
          }
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  var errorHandler = function (err, result, code) {
      if (err) {
        this(false);
        return;
      }
      grunt.log.ok();
      this();
  };

  grunt.event.on('watch', function (action, path) {
    grunt.config('convert.path', path);
  });

  grunt.registerTask('default', ['template', 'connect', 'watch']);

  grunt.registerTask('convert', function () {
    var path = grunt.config('convert.path');
    console.log(path);
    var done = this.async();
    builder.convert(context, path, function (err) {
      if (err) {
        done(false);
        return;
      }
      grunt.log.ok();
      done();
    });
  });
  
  grunt.registerTask('compress', function () {
    var done = this.async();
    grunt.log.writeln('compress sencha app...');

    grunt.util.spawn({
      cmd: 'sencha',
      args: ['app', 'build'],
      opts: {
        cwd: 'sencha',
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

  grunt.registerTask('web', function () {
    var done = this.async();
    grunt.log.writeln('running web server');
  });
  
  grunt.registerTask('build', [
    'clean',
    'template',
    'compress',
    'copy',
    'update',
    'compile'
  ]);

  grunt.registerTask('test', ['build', 'run']);

  grunt.registerTask('parse', function () {
    var done = this.async();
    grunt.log.writeln('parse template to code...');
    builder.build(context, function (err) {
      if (err) {
        done(false);
        return;
      }
      grunt.log.ok();
      done();
    });
  });

  grunt.registerTask('meta', function () {
    var meta = require('./lib/meta');
    grunt.log.write('writing meta message...');
    meta.build(context);
    grunt.log.ok();
  });

  grunt.registerTask('template', ['meta', 'parse']);
}
