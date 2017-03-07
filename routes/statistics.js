
/*
 * GET home page.
 */

exports.viewStatistics = function(req, res){

	/*models.Project
		.find()
		.sort('date')
		.exec(renderProjects);
*/
		res.render('statistics');

};