const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const router = require("express").Router();
router.use(passport.authenticate("jwt", { session: false}));


router.post("/language", mustbe.authorized("Admin"), (req, res, next) => {
    models.Language.create(req.body)
        .then(language => {
            return res.send(language);
        }, err => {
            return next(err);
        })
});


module.exports = router;
