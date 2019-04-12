const router = require("express").Router();
const passport = require("passport");

router.route("/")
  .post(
    passport.authenticate(
      "local",
      {
        successRedirect: "/profile",
        failureRedirect: "/",
      }
    )
  );

module.exports = router;