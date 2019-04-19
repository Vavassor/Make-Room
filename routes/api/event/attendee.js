const router = require("express").Router();
const eventController = require("../../../controllers/eventController");

router.route("/")
  .get(eventController.getAttendees)
  .patch(eventController.attendEvent);

module.exports = router;