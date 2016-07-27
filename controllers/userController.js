const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");


router.post("/users/login", passport.authenticate("local", { session: false }), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => {
        if(err) {
            return next(err);
        } else {
            return res.send(jwt);
        }
    })
});

router.post("/users", (req, res, next) => {
    models.User.createUser(req.body, (err, user) => {
        if(err) {
            return next(err)
        } else {
            return res.send(user);
        }
    })
});

router.post("/users/getUser", passport.authenticate("jwt", { session: false}), (req, res, next) => {
    res.send(req.user);
});


module.exports = router;
