
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./routes/models');


// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'affin';
var mongodbURI = "mongodb://heroku_3b5860g1:adannf1r7iabc18mbsu23a9moo@ds119810.mlab.com:19810/heroku_3b5860g1";
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = mongodbURI || local_database_uri

mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var emoti = require('./emoticomments.json');
var emoticomments_json = emoti.emoticomments;

var chores = require('./chores.json');
var chores_json = chores.chores;

var user_json = require('./user.json');




// Step 2: Remove all existing documents
models.Chore
  .find()
  .remove()
  .exec(onceClearA); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearA(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = chores_json.length;
  for(var i=0; i<chores_json.length; i++) {
    var json = chores_json[i];
    var chore = new models.Chore(json);

    chore.save(function(err, chore) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE with Chores');
        // The script won't terminate until the 
        // connection to the database is closed
        
      }
    });
  }
}


// Step 2: Remove all existing documents
models.EmotiComment
  .find()
  .remove()
  .exec(onceClearB); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearB(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = emoticomments_json.length;
  for(var i=0; i<emoticomments_json.length; i++) {
    var json = emoticomments_json[i];
    var emoticomment = new models.EmotiComment(json);

    emoticomment.save(function(err, emoticomment) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE with EmotiComment');
        // The script won't terminate until the 
        // connection to the database is closed
       
      }
    });
  }
}

// Step 2: Remove all existing documents
models.User
  .find()
  .remove()
  .exec(onceClearC); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearC(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = user_json.length;
  for(var i=0; i<user_json.length; i++) {
    var json = user_json[i];
    var user = new models.User(json);

    user.save(function(err, user) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE with User');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}

