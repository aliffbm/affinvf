
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  // fields are defined here
 	 	"title": String,
		"date": Date,
		"summary": String,
		"image": String
});

exports.Project = Mongoose.model('Project', ProjectSchema);



var ChoreSchema = new Mongoose.Schema({
  // fields are defined here
 	 	"name": String,
 	 	"expectedTime": String,
		"image": String,
		"emoticomments": [{"name": String, "image": String, "hits": Number}]
});

exports.Chore = Mongoose.model('Chore', ChoreSchema);

var EmotiCommentSchema = new Mongoose.Schema({
  // fields are defined here
 	
		"name": String,
		"image": String,
		"hits": Number
});

exports.EmotiComment = Mongoose.model('EmotiComment', EmotiCommentSchema);


var UserSchema = new Mongoose.Schema({

	"name": String,
	"password": String, // Need to change this to safe way of doing this
	"currentChore": String,
	"daysToComplete": String,
	"image": String
});

exports.User = Mongoose.model('User', UserSchema);
