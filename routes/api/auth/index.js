const router = require("express").Router();
const tokenRoutes = require("./token");

router.use("/token", tokenRoutes);

module.exports = router;