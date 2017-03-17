var models = require('./models.js');
var emoData = require('../emoticomments.json');
/*
 * GET home page.
 */

/*exports.viewEmotiComments = function(req, res){

	models.EmotiComment
		.find()
		.exec(renderEmoticomments);

	function renderEmoticomments(err, emoticomments){

		res.render('statistics', {'emoticomments': emoticomments});
	}

}
*/
/*
exports.viewEmotiCommentsJSON = function(req, res){

	res.render('choresB', emoData);

}*/

exports.addHit = function(req, res){

	var hitName = req.params.type;

	models.EmotiComment
		.find({name: hitName}, function(err, emoti){
			var emoti = emoti[0];
			if(err){console.log(err)}else{
				emoti.hits = emoti.hits + 1;

				emoti.save();
			}
		});

		


}

exports.emoJSON = function(req, res){
	res.json(emoData);
}
