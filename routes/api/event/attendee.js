const eventController = require("../../../controllers/eventController");
const router = require("express").Router({mergeParams: true});
const passport = require("passport");

router.route("/")
  .get(eventController.getAttendees)
  .patch(
    passport.authenticate("jwt", {session: false}),
    eventController.attendEvent
  );

module.exports = router;