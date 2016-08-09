const models = require("../models");
const auth = require("../util/auth/index");
const router = require("express").Router();
const passport = require("passport");



router.post("/", passport.authenticate("jwt", { session: false }), auth.can("Create Category"), (req, res, next) => {
    res.locals.promise = models.Category.createCategory(req.body);
    return next();
});


module.exports = router;
