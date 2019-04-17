const router = require("express").Router();
const selfRoutes = require("./self");
const userController = require("../../../controllers/userController");

router.route("/")
  .post(userController.create);

router.use("/self", selfRoutes);


module.exports = router;