var Handlebars = require('handlebars');
var fs = require('fs');

module.exports = Meta;

function Meta() {
}

Meta.build = function (context) {
    var appjs = fs.readFileSync('meta/app.js').toString();
    fs.writeFileSync('sencha/app.js', Handlebars.compile(appjs)(context));

    var appjson = fs.readFileSync('meta/app.json').toString();
    fs.writeFileSync('sencha/app.json', Handlebars.compile(appjson)(context));

    var configxml = fs.readFileSync('meta/config.xml').toString();
    fs.writeFileSync('cordova/config.xml', Handlebars.compile(configxml)(context));
}