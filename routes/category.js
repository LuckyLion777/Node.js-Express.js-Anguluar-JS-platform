const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const router = require("express").Router();
const passport = require("passport");



router.post("/category", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Create Category"), (req, res, next) => {
    res.locals.promise = models.Category.createCategory(req.body);
    return next();
});


module.exports = router;
