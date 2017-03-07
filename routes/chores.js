var models = require('./models.js');
/*
 * GET home page.
 */

exports.viewChores = function(req, res){

	models.Chore
		.find()
		.exec(renderChores);

	function renderChores(err, chores){

		res.render('chores', {'chores': chores});
	}

}

exports.addChore = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var chore = new models.Chore({name: form_data['choreTitle'], expectedTime: form_data['expectedTime'],image: form_data['image']});
  chore.save(afterSave);
  function afterSave(err){
    if(err) {console.log(err); res.send(500);}
    res.redirect("/chores");

  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send(
}

exports.deleteChore = function(req, res) {
  var choreID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Chore
    .find({_id: choreID})
    .remove()
    .exec(afterRemoving)

  function afterRemoving(err){
    if(err) {console.log(err); res.send(500);}
    console.log("Complete! ")
    res.redirect('/chores');
  }
}