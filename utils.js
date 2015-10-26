var fs = require('fs');

function getApp(appName) {
    var apps = fs.readdirSync('apps');
    return apps.indexOf(appName) !== -1;
}

module.exports.getApp = getApp;
