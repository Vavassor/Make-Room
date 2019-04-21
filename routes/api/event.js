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
  .post(
    passport.authenticate("jwt", {session: false}),
    eventController.updateEvent
  )
  .delete(eventController.deleteEvent);

router.route("/:id/attendee")
  .post(
    passport.authenticate("jwt", {session: false}),
    eventController.attendEvent
  )
  .delete(
    passport.authenticate("jwt", {session: false}),
    eventController.stopAttendingEvent
  );

module.exports = router;