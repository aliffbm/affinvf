
/*
 * GET home page.
 */

exports.viewHome = function(req, res){

	/*models.Project
		.find()
		.sort('date')
		.exec(renderProjects);
*/
		res.render('home');

};