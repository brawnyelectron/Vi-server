var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var utils = require('../utils');
var fs = require('fs');

var Extension = require('../db/Extension');
var Developer = require('../db/Developer');

router.get('/', function(req, res) {
  var name = req.query.name || '';
  Extension.find({name: {"$regex": name, "$options": "i"}}, function(err, extensions) {
    if (err) {
      console.log('Error in retrieving all extensions: ', err);
    } else {
      console.log('extensions =', extensions);
      res.send(extensions);
    }
  });
});

router.post('/', function(req, res) {
  /* Ideally need extensions name, developer id, and zipped extension in request */
  req.accepts('application/zip');
  /* Developer name of the extension is being hardcoded in. This should be related to the post, hard to have multipart req.body */
  Developer.findOne({ username: "pawTestUser" }, function(err, dev) {
    if (err) {
      console.log('No dev found! Or error: ', err);
    } else {
      /* Name of the extension is being hardcoded in. This should be related to the post, hard to have multipart req.body */
      utils.addExtension(req.body, "demo", function() {
        res.sendStatus(200);
      });
      var extensions = new Extension({ developerId: "fakeId", name: "demo", description: "fake description", commands: [], iconURL: "fake icon URL"  })
      extensions.save(function(err) {
        if (err) { 
          console.log('Didn\'t save Extension to Extension collection')
        };
        console.log('Extension saved!');
      });
    }
  });
});

module.exports = router;