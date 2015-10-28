var mongoose = require('mongoose');

var developerSchema = mongoose.Schema({
  username: String,
  password: String
});

var Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer
