var Handlebars = require('handlebars');

var stringWrap = function (str) {
  return str = '\'' + str + '\'';
};

Handlebars.registerHelper('class', function (inherit) {
  var options = arguments[arguments.length - 1];
  var classname = this.APPNAME + '.' + this.PATH + '.' + this.FILENAME;

  if (this.type === '.coffee') {
    if (inherit != options) {
      return 'Ext.define \'' + classname + '\',\n'
        + '  extend: ' + stringWrap(inherit)
        + options.fn(this);
    }

    return 'Ext.define \'' + classname + '\','
      + options.fn(this);
  }

  if (inherit != options) {
    return 'Ext.define(\'' + classname + '\', {\n'
      + '    extend: ' + stringWrap(inherit) + ',\n'
      + options.fn(this)
      + '});';
  }

  return 'Ext.define(\'' + classname + '\', {'
    + options.fn(this)
    + '});';
});

Handlebars.registerHelper('app', function (className) {
  return this.APPNAME + '.' + className;
});

Handlebars.registerHelper('view', function (className) {
  return this.APPNAME + '.view.' + className;
});

Handlebars.registerHelper('controller', function (className) {
  return this.APPNAME + '.controller.' + className;
});

Handlebars.registerHelper('store', function (className) {
  return this.APPNAME + '.store.' + className;
});

Handlebars.registerHelper('model', function (className) {
  return this.APPNAME + '.model.' + className;
});

Handlebars.registerHelper('profile', function (className) {
  return this.APPNAME + '.profile.' + className;
});