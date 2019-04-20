const eventController = require("../../controllers/eventController");
const router = require("express").Router({mergeParams: true});
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

router.route("/attendee")
  .get(eventController.getAttendees)
  .patch(
    passport.authenticate("jwt", {session: false}),
    eventController.attendEvent
  );

module.exports = router;