var models = require('./models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  console.log("The id is: " + projectID)
  models.Project
    .find({_id: projectID})
    .exec(afterQuery)

  function afterQuery(err, projects) {
    if(err) console.log(err);
    console.log(projects);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var proj = new models.Project({title: form_data['project_title'], image: form_data['image_url'], date: form_data['date'], summary: form_data['summary']});
  proj.save(afterSave);
  function afterSave(err){
    if(err) {console.log(err); res.send(500);}
    res.redirect("/");

  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send(
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project
    .find({_id: projectID})
    .remove()
    .exec(afterRemoving)

  function afterRemoving(err){
    if(err) {console.log(err); res.send(500);}
    console.log("Complete! ")
    res.redirect('/');
  }
}