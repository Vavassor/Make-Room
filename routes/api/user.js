const router = require("express").Router();
const passport = require("passport");
const userController = require("../../controllers/userController");

router.route("/")
  .post(userController.create);

router.route("/self")
  .get(
    passport.authenticate("jwt", {session: false}),
    userController.getSelf
  );

module.exports = router;