var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sona');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('I am opened!');
});
