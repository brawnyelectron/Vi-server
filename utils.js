var fs = require('fs');

function getExt(extName) {
  var exts = fs.readdirSync('lib');
  return exts.indexOf(extName) !== -1;
}

function attemptCommand = function(phrase, commands, callback){
  /* iterate throught commands, see if there is a valid match */
  for (var key in commands){
    /* If key no arguments */
    if (!key.match(/\$/g)) {
      if (key === phrase) {
        return commands[key]('error', callback);          
      }
    } else {
      /* If can gather arguments i.e. valid match */
      var args = Vi.helpers.inputToArgumentsArray(key, phrase);
      if(args){
        /* Add error as first argument always */
        args.unshift(callback);
        args.unshift('error');
        return commands[key].apply(null, args);
      }
    }
  }

  return false; 
}

function inputToArgumentsArray = function(command,input){
  /* Replaces $[0-9] spots with (.*) to be used as wildcards when string is converted to RegExp */
  var reg = new RegExp(command.replace(/\$[0-9]/g, "(.*)"));

  /* Gets arguments using that regex */
  var matches = input.match(reg);

  if (!matches) {
    return null;
  }

  /* Takes out full match at index 0  */
  var args = matches.slice(1, matches.length);
  
  return args;
}

module.exports.getExt = getExt;
module.exports.attemptCommand = attemptCommand;
module.exports.inputToArgumentsArray = inputToArgumentsArray;
