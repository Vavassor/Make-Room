const router = require("express").Router();
const db = require("../../models/index");

function getProfileById(req, res){

}

function updateProfile(req, res){

}

function deleteProfile(req, res){

}



router.route("/:id")
  .get(getProfileById)
  .patch(updateProfile)
  .delete(deleteProfile);

module.exports = router;