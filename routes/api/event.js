const router = require("express").Router();
const db = require("../../models");


function getAllEvents(req, res){
  db.Event
    .find()
    .then(events => res.json(events))
    .catch(err => res.status(422).json(err));
}

function createEvent(req, res){
  db.Event
    .create(req.body)
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err))
}

function getEventById(req, res){
  db.Event
    .find({_id: req.params.id})
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err))
}

function updateEvent(req, res){
  db.Event
    .findOneAndUpdate({_id: req.body.id})
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err))
}

function deleteEvent(req, res){
  db.Event
  .deleteOne({_id: req.params.id})
  .then(response => res.json(response))
  .catch(err => res.status(422).json(err))
}

router.route("/")
  .get(getAllEvents)
  .post(createEvent)

router.route("/:id")
  .get(getEventById)
  .patch(updateEvent)
  .delete(deleteEvent);

module.exports = router;