var mongoose = require('mongoose');

var userScheme = mongoose.Schema({
  user_id: String,
  extension_auths: Object
});

var User = mongoose.model('User', userScheme);

module.exports = User