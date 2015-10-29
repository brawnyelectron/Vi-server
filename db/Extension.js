var mongoose = require('mongoose');

var extensionSchema = mongoose.Schema({
  developerId: String,
  name: String,
});

var Extension = mongoose.model('Extension', extensionSchema);

module.exports = Extension;
