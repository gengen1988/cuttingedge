var compiler = require('./compiler');

var rimraf = require('rimraf');
var walk = require('walk');
var mkdirp = require('mkdirp');
var coffee = require('coffee-script');
var Handlebars = require('handlebars');
var fs = require('fs');
var dirname = require('path').dirname;

module.exports = Builder;

function Builder() {
}

Builder.finish = function (context, err) {
  if (err) throw err;
  context.next();
}

Builder.compileTemplate = function (context, err, file) {
  var filename = context.fileStats.name;
  var classname = filename.substr(0, filename.lastIndexOf('.'));
  var type = filename.substring(filename.lastIndexOf('.'));
  var namespace = context.root.substring(4).replace('/', '.');

  var data = {
    APPNAME: this.appname,
    FILENAME: classname,
    PATH: namespace,
    type: type
  };

  var template = Handlebars.compile(file.toString());
  var output = template(data);

  var newPath = 'build/' + context.root + '/' + classname + '.js';
  if (type == '.coffee') {
    output = coffee.compile(output);
  }

  console.log('generate: ' + newPath + '...');
  this.writeFileP(newPath, output, this.finish.bind(this, context));
}

Builder.readFile = function (root, fileStats, next) {
  var source = root + '/' + fileStats.name;
  var context = {
    root: root,
    fileStats: fileStats,
    next: next
  };

  fs.readFile(source, this.compileTemplate.bind(this, context));
};

Builder.build = function () {
  var walker = walk.walk('app');

  this.appname = 'Bootplate';

  walker.on('file', this.readFile.bind(this));
};

Builder.clean = function () {
  rimraf('build', function (err) {
    if (err) throw err;
  });
}

Builder.writeFileP = function (path, data, callback) {
  mkdirp(dirname(path), function (err) {
    if (err) return callback(err);
    fs.writeFile(path, data, callback);
  });
};