const router = require("express").Router();
const passport = require("passport");

router.route("/")
  .post(passport.authenticate(
    "basic",
    {
      successReturnToOrRedirect: "/secret",
      failureRedirect: "/",
    }
  ));

module.exports = router;