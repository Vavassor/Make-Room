const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const eventRoutes = require("./event");
const portfolioRoutes = require("./portfolioAPI");
const profileRoutes = require("./profileAPI");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/event", eventRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/profile", profileRoutes);

module.exports = router;