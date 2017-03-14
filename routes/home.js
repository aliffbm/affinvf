var models = require('./models.js');
/*
 * GET home page.
 */

exports.viewHome = function(req, res){

	var user = req.params.user;

	models.User
		.find({name: user})
		.exec(renderUser);

		function renderUser(err, user){
			if(err){
				console.log(err);
				res.status(500).send();
			}else{
				if(!user){
					res.status(404).send();
				}else{
					res.render('home', {"user": user});
				}
			}
			
		}

};