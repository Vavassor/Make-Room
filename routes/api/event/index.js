const attendeeRoutes = require("./attendee");
const eventController = require("../../../controllers/eventController");
const passport = require("passport");
const router = require("express").Router();

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

router.use("/:id/attendee", attendeeRoutes);

module.exports = router;