var models = require("../models");
var router = require("express").Router();
var passport = require("passport");

router.post("/user/login", passport.authenticate("local", { session: false }), function (req, res, next) {
    res.send("logged in");
});

router.post("/user", function (req, res, next) {
    models.User.createUser(req.body, function (err, user) {
        if(err) {
            return res.send(err)
        } else {
            return res.send(user);
        }
    })
});


module.exports = router;
