const router = require("express").Router();
const loginRoutes = require("./login");
const userRoutes = require("./user");

router.use("/login", loginRoutes);
router.use("/user", userRoutes);

module.exports = router;