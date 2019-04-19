const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const passport = require("passport");

router.route("/")
  .get(eventController.getAllEvents)
  .post(
    passport.authenticate("jwt", {session: false}),
    eventController.createEvent
  );

router.route("/:id")
  .get(eventController.getEventById)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;