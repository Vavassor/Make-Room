const router = require("express").Router();
const userController = require("../../../controllers/userController");
const passport = require("passport");

router.route("/")
  .get(
    passport.authenticate("jwt", {session: false}),
    userController.getSelf
  );

module.exports = router;