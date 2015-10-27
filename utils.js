var fs = require('fs');

function getExt(extName) {
  var exts = fs.readdirSync('lib');
  return exts.indexOf(extName) !== -1;
}

module.exports.getExt = getExt;
