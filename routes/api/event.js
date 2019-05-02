const eventController = require("../../controllers/eventController");
const router = require("express").Router({mergeParams: true});
const multer = require("multer");
const passport = require("passport");
const upload = multer();
  
router.route("/")
  .get(eventController.getAllEvents)
  .post(
    passport.authenticate("jwt", {session: false}),
    eventController.createEvent
  );

router.route("/:id")
  .get(eventController.getEventById)
  .patch(
    passport.authenticate("jwt", {session: false}),
    upload.single("file"),
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