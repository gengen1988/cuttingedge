var Handlebars = require('handlebars');
var fs = require('fs');

module.exports = Meta;

var APP_DIR = '.workspace/sencha';
var META_DIR = '.workspace/meta';
var CORDOVA_DIR = '.workspace/cordova';

function Meta() {
}

Meta.build = function (context) {
    var appjs = fs.readFileSync(META_DIR + '/app.js').toString();
    fs.writeFileSync(APP_DIR + '/app.js', Handlebars.compile(appjs)(context));

    var appjson = fs.readFileSync(META_DIR + '/app.json').toString();
    fs.writeFileSync(APP_DIR + '/app.json', Handlebars.compile(appjson)(context));

    var configxml = fs.readFileSync(META_DIR + '/config.xml').toString();
    fs.writeFileSync(CORDOVA_DIR + '/config.xml', Handlebars.compile(configxml)(context));
}
