var mongoose = require('mongoose');

var appSchema = mongoose.Schema({
  developerId: mongoose.Schema.Types.ObjectId,
});

var App = mongoose.model('App', appSchema);

module.exports = App;
