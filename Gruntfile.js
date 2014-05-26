var builder = require('./.workspace/dsl/builder');
var WORKSPACE_DIR = '.workspace';
var APP_DIR = WORKSPACE_DIR + '/sencha';
var CORDOVA_DIR = WORKSPACE_DIR + '/cordova';
var path = require('path');
var fs = require('fs');
var request = require('request');
var DecompressZip = require('decompress-zip');

var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = function (grunt) {

  var appname = capitalize(path.basename(__dirname));
  var context = {
    appname: appname,
    appid: 'com.eteng.mobile.' + appname
  };

  console.log(context);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [CORDOVA_DIR + '/www/*', WORKSPACE_DIR + '/build/*', APP_DIR + '/app/*'],
    copy: {
      app: {
      	expand: true,
      	cwd: WORKSPACE_DIR + '/build/native/' + context.appname,
        src: '**',
      	dest: CORDOVA_DIR + '/www/'
      },
      sass: {
        expand: true,
        cwd: 'sass',
        src: '**',
        dest: APP_DIR + '/resources/sass/'
      }
    },
    watch: {
      templates: {
        files: 'src/**',
        tasks: ['parse'],
        options: {
          spawn: false,
          livereload: {
            livereloadOnError: false,
            port: 35729
          }
        }
      },
      style: {
        files: 'sass/**',
        tasks: ['copy:sass']
      }
    },
    connect: {
      server: {
        options: {
          port: 1841,
          base: WORKSPACE_DIR,
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

  grunt.registerTask('default', ['template', 'connect', 'sencha-watch', 'watch']);

  grunt.registerTask('sencha-watch', function () {
    grunt.log.writeln('watch sencha sass');
    grunt.util.spawn({
      cmd: 'sencha',
      args: ['app', 'watch'],
      opts: {
        cwd: APP_DIR,
        stdio: 'inherit'
      }
    }, function (err, result, code) {
      grunt.log.writeln('err: ' + err);
    });
  });

  grunt.registerTask('compress', function () {
    var done = this.async();
    grunt.log.writeln('compress sencha app...');

    grunt.util.spawn({
      cmd: 'sencha',
      args: ['app', 'build', 'native'],
      opts: {
        cwd: APP_DIR,
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
        cwd: CORDOVA_DIR,
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
        cwd: CORDOVA_DIR + '/platforms/android',
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
        cwd: CORDOVA_DIR,
        stdio: 'inherit'
      }
    }, errorHandler.bind(done));
  });
  
  grunt.registerTask('build', [
    'clean',
    'template',
    'copy:sass',
    'compress',
    'copy:app',
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
    var meta = require('./.workspace/dsl/meta');
    grunt.log.write('writing meta message...');
    meta.build(context);
    grunt.log.ok();
  });

  grunt.registerTask('template', ['meta', 'parse']);

  grunt.registerTask('download', function () {
    var done = this.async();
    request('https://github.com/gengen1988/document/archive/master.zip')
      .pipe(fs.createWriteStream('updater.zip'))
      .on('end', function () {
        done();
      });
  });

  grunt.registerTask('decompress', function () {
    var unzipper = new DecompressZip('updater.zip');
    var done = this.async();
    grunt.log.write('decompress update package');

    unzipper.on('extract', function (log) {
      done();
    });

    unzipper.extract({
      path: 'tmp'
    });

  });
}
