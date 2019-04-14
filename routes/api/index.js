const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const eventRoutes = require("./event");
const portfolioRoutes = require("./portfolio");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/event", eventRoutes);
router.use("/portfolio", portfolioRoutes);

module.exports = router;