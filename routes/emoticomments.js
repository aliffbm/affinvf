var models = require('./models.js');
var emoData = require('../emoticomments.json');
/*
 * GET home page.
 */

exports.viewEmotiComments = function(req, res){

	models.EmotiComment
		.find()
		.exec(renderEmoticomments);

	function renderEmoticomments(err, emoticomments){

		res.render('emoticomments', {'emoticomments': emoticomments});
	}

}

exports.viewEmotiCommentsJSON = function(req, res){

	res.render('choresB', emoData);

}
