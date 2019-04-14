const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const eventRoutes = require("./event");
const profileRoutes = require("./profile");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/event", eventRoutes);
router.use("/profile", profileRoutes);

module.exports = router;