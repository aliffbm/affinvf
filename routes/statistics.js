var models = require('./models');
/*
 * GET home page.
 */

exports.viewStatistics = function(req, res){

	models.EmotiComment
		.find()
		.exec(renderEmoticomments);

	function renderEmoticomments(err, emoticomments){

		res.render('statistics', {'emoticomments': emoticomments});
	}

};