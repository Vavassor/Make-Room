const router = require("express").Router();
const passport = require("passport");
const tokenController = require("../../controllers/tokenController");

router.route("/token")
  .post(
    passport.authenticate("local", {session: false}),
    tokenController.create
  );

module.exports = router;