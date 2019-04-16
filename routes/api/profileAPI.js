const router = require("express").Router();
const db = require("../../models");

function getProfileById(req, res){
  db.User
  .find({_id: req.params.id})
  .then(response => {
    response[0].password = "";
    res.json(response);
  })
  .catch(err => console.error(err))
};

function updateProfile(req, res){
  console.log(req.params, req.body)
  db.User
  .updateOne({_id: req.params.id}, req.body)
  .then(response => {
    console.log(response)
    res.json(response);
  })
  .catch(err => console.log(err))
};

function deleteProfile(req, res){

};



router.route("/:id")
  .get(getProfileById)
  .patch(updateProfile)
  .delete(deleteProfile);


module.exports = router;