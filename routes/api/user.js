const router = require("express").Router();
const userController = require("../../controllers/userController.js");

router.route("/")
  .post(userController.create);

module.exports = router;