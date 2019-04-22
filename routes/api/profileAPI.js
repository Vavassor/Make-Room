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
  db.User
  .updateOne({_id: req.params.id}, req.body)
  .then(response => {
    console.log(response)
    res.json(response);
  })
  .catch(err => console.log(err))
};

function getUserEvents(req, res){
  db.Event
  .find(
    {
      attendees: {$in: req.params.id},
      endTime: {$gt: new Date()}
    },
    )
    .sort({ "startTime": 1 })
    .then(data => {
      res.json(data)
    })
    .catch(err => res.json(err))
  };
  

  function deleteProfile(req, res){
  
  };


  router.route("/info/:id")
  .get(getProfileById)
  .patch(updateProfile)
  .delete(deleteProfile);

router.route("/events/:id")
  .get(getUserEvents)

module.exports = router;