var mongoose = require('mongoose');

var userScheme = mongoose.Schema({
  userId: String,
  extensions: Array,
  extensionAuths: Object,
});

var User = mongoose.model('User', userScheme);

module.exports = User;
