var models = require('./models.js');
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

