var mongoose = require('mongoose');

var userScheme = mongoose.Schema({
  userId: String,
  extensionAuths: Object
});

var User = mongoose.model('User', userScheme);

module.exports = User
