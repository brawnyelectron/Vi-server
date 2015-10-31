var fs = require('fs');
var extract = require('extract-zip');

function getExt(extName) {
  var exts = fs.readdirSync('lib');
  return exts.indexOf(extName) !== -1;
}

function addExtension(bufferedZip, appName, resCB) {
  /* Makes temp zip file */
  fs.writeFile('tmp/' + appName + '.zip', bufferedZip, function(err) {
    if (err) { 
      console.log('Error in writing buffer to zip file, ', err);
    }
    /* Unpack zip file to individual files */
    extract('tmp/' + appName + '.zip', { dir: 'lib/' }, function(err) {
      if (err) { 
        console.log('Couldn\'t unzip file!', err);
      }
        
      /* Remove temp file */
      fs.unlinkSync('tmp/' + appName + '.zip');
      resCB();
    });
  });
}

function runCommand(transcript, auth, cb) {
  var match = transcript.match(/(?:\w+)\s(\w+)\s(\w+)(?:\s(.*))?/i);

  var extName = match[1];
  var cmd = match[2].toLowerCase();
  var phrase = cmd + ' ' + match[3];
  console.log('phrase =', phrase);

  var ext;
  var filename = './lib/' + extName + '/ext.js';
  try {
    ext = require(filename);
  } catch(e) {
    console.log(e);
    cb(true, 'Sorry, I couldn\'t find this extension');
    return;
  }

  for (var key in ext.commands) {
    if (key.indexOf(cmd) === -1)
      continue;
    executeCommand(key);
    return;
  }

  cb(true, 'Sorry, I couldn\'t find ' + cmd);

  function executeCommand(key) {
    var match = key.match(/\$/g);
    if (match === null) {
      ext.commands[key]();
      cb(null, 'ran command');
      return;
    }
    var args = extractArgs(key, match.length, phrase);
    ext.commands[key](cb, auth, args);
  }
}

function extractArgs(key, numArgs, phrase) {
  var regexStr = key;

  for (var i = 1; i <= numArgs; i++) {
    regexStr = regexStr.replace('$' + i, '(.*)');
  }

  var regex = new RegExp(regexStr);

  match = phrase.match(regex);
  var args = match.slice(1);

  return args;
}

function runAuthenticationSequence(extension, cb) {
  /* Run authentication given app name and then redirect with callback */
  var auth = require('./lib/' + extension + '/auth.js');
  cb();
}

module.exports.runCommand = runCommand;
module.exports.getExt = getExt;
module.exports.addExtension = addExtension;
module.exports.extractArgs = extractArgs;
module.exports.runAuthenticationSequence = runAuthenticationSequence;
