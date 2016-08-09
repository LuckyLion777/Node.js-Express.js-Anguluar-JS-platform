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
router.use("/category", require("./category"));
router.use("/", require("./util"));


module.exports = router;