
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var home = require('./routes/home');
var chores = require('./routes/chores');
var choresB = require('./routes/choresB');
var stats = require('./routes/statistics');
var emoticomments = require('./routes/emoticomments')
//var emoticomments = require('./routes/emoticomments');
// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'affin';
var mongodbURI = "mongodb://heroku_3b5860g1:adannf1r7iabc18mbsu23a9moo@ds119810.mlab.com:19810/heroku_3b5860g1";

var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = mongodbURI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/home', home.viewHome);
app.get('/chores', chores.viewChores);
app.post('/chores/:id/delete', chores.deleteChore);
app.post('/chores/new', chores.addChore);

app.get('/choresB', choresB.viewChores);
app.post('/choresB/:id/delete', choresB.deleteChore);
app.post('/choresB/new', choresB.addChore);

app.get('/statistics', stats.viewStatistics);

app.get('/emoticomments', emoticomments.viewEmotiComments);




// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
