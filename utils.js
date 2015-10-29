var fs = require('fs');

function runCommand(transcript, cb) {
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
    ext.commands[key](cb, args);
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

function runAuthenticationSequence(appName, req, res, next, responseCB) {
  /* Run authentication given app name */
  var auth = require('./lib/' + appName + '/auth.js');
  auth.authenticate(req, res, next, responseCB);
}

module.exports.runCommand = runCommand;
module.exports.extractArgs = extractArgs;
module.exports.runAuthenticationSequence = runAuthenticationSequence;
