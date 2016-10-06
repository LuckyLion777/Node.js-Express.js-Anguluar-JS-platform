const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");
const upload = require("../config/multer");


router.post("/", upload.single("icon"), passport.authenticate("jwt", { session: false }), auth.can("Create Category"), (req, res, next) => {

    if(req.file) req.body.icon = { filename: req.file.filename };

    res.locals.promise = models.Category.createCategory(req.body);
    return next();
});



router.get("/", (req, res, next) => {
    res.locals.promise = models.Category.getCategories();
    return next();
});

module.exports = router;
