const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");

router.post("/user/login", passport.authenticate("local", { session: false }), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => {
        if(err) {
            return next(err);
        } else {
            res.result = jwt;
            return next();
        }
    })
});

router.post("/user", (req, res, next) => {
    models.User.createUser(req.body, (err, user) => {
        if(err) {
            return next(err)
        } else {
            res.result = user;
            return next();
        }
    })
});


module.exports = router;
