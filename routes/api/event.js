const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/")
  .get(eventController.getAllEvents)
  .post(eventController.createEvent)

router.route("/:id")
  .get(eventController.getEventById)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;