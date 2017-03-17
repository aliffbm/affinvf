
/**
 * Module dependencies.
 */

 var models = require('./routes/models.js');

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var home = require('./routes/home');
var chores = require('./routes/chores');
// var choresB = require('./routes/choresB');
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
app.use(bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());




app.use(express.session({secret:"ok", resave:false, saveUninitialized:true}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
/*app.get('/', function(req,res){
	res.send();
})*/
var localData;
app.get('/login', function(req, res){

	console.log("Anydata?");
	console.log(localData);
	models.User
		.find({name: localData})
		.exec(sendInfo);

		function sendInfo(err, user){
			res.json(user);
		}

})

app.post('/login', function(req,res){

	var username = req.body.username;
	var userpassword = req.body.password;


	localData = username;

	models.User
		.find({name: username})
		.exec(doSomething);

	function doSomething(err, username){
		if(err){
			console.log(err);
		}else{
			// console.log(username[0].password);
			if(username[0] && (username[0].password === userpassword)){
				res.redirect('/home/'+username[0].name+'');
			}else{
				res.send("You are not authorized <a href='/'>Go Back</a>");
			}
		}
	}

});

app.post("/register", function(req, res){

	var newusername = req.body.registername;
	var newpassword = req.body.password;

	models.User
		.find({name: newusername})
		.exec(registerUser);

	function registerUser(err, user){
		//var user = user[0];
		if(err){
			console.log(err);
			res.status(505).send();
		}else{
			if(user[0]){
				res.send("The username already exist <a href='/'>Go Back</a>")
			}else{

				
				var newUser = new models.User({name:newusername, password:newpassword, currentChore:"You currently don't have a chore assigned", daysToComplete:"Not in the game yet", image:"../images/svg/add.svg"}); 
				newUser.name = newusername;
				newUser.save(afterSave);
				function afterSave(err){
					if(err){
						console.log(err);
						//res.send(500);
					}else{
						res.send("The username " + newUser.name + " has been created: <a href='/'>Go Back</a>")
					}
				}
				
			}
		}

	}
})

app.get('/home/:user', home.viewHome);
//app.get('/home/:user', home.User);
app.get('/chores', chores.viewChores);
app.get('/choresb', chores.viewChoresB);
app.post('/chores/:id/delete', chores.deleteChore);
app.post('/chores/new', chores.addChore);

app.get('/statistics', stats.viewStatistics);

//app.get('/emoti', emoticomments.viewEmotiComments);

app.get('/emoticomments', function(req, res){

	models.EmotiComment
		.find()
		.exec(sendData);

		function sendData(err, data){
			if(err){console.log(err)}else{
				res.json(data);
			}
		}

	});
/*app.get('/emoticomments/addHit', function(req, res){

	models.EmotiComment
		.find()
		.exec(sendData);

		function sendData(err, data){
			if(err){console.log(err)}else{
				res.json(data);
			}
		}
})*/
app.post('/emoticomments/:type/addHit', emoticomments.addHit);



// app.get('/emoticommentsjson', emoticomments.viewEmotiCommentsJSON);

/*app.get('/choresB', choresB.viewChores);
*/
// app.post('/choresB/:id/delete', choresB.deleteChore);
// app.post('/choresB/new', choresB.addChore);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
