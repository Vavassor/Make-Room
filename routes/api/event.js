const router = require("express").Router();
const db = require("../../models");

function getAllEvents(request, response){
  let query = db.Event.find();

  if (request.query["order_by"]) {
    const orderBy = request.query["order_by"].split(":");
    const key = orderBy[0];
    let direction = "+";
    if (orderBy.length > 1) {
      if (orderBy[1] === "asc") {
        direction = "+";
      }
      if (orderBy[1] === "desc") {
        direction = "-";
      }
    }
    query = query.sort(direction + key);
  }

  if (request.query["after_time"]) {
    const startTime = request.query["after_time"];
    query = query.where("startTime").gte(startTime);
  }

  query
    .then((events) => {
      const responseEvents = events.map((event) => {
        const data = {
          address: event.address,
          id: event._id,
          name: event.name,
          placeName: event.placeName,
          startTime: event.startTime,
        };
        return data;
      });
      response.json(responseEvents);
    })
    .catch(error => response.status(422).json(error));
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