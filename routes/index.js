const router = require("express").Router();


router.use("/user", require("./abstractUser"));
router.use("/user", require("./user"));
router.use("/articles?", require("./article"));
router.use("/business(es)?", require("./business"));
router.use("/locations?", require("./location"));
router.use("/languages?", require("./language"));
router.use("/businessUser", require("./businessUser"));
router.use("/events?", require("./event"));
router.use("/collections?", require("./collection"));
router.use("/admin", require("./admin"));
router.use("/businessCategory", require("./businessCategory"));
router.use("/eventCategory", require("./eventCategory"));
router.use("/upload", require("./upload"));
router.use("/", require("./util"));


module.exports = router;