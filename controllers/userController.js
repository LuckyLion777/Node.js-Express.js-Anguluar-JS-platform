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
        user
            .then(user => {
                return res.send(user);
            }, err => {
                return next(err)
            });
    })
});

router.put("/users", passport.authenticate("jwt", { session: false}), (req, res, next) => {
    req.user.updateUser(req.body, (err, user) => {
        user
            .then(result => {
                return res.send(result);
            }, err => {
                return next(err);
            });
    })
});

router.get("/users", passport.authenticate("jwt", { session: false}), (req, res, next) => {
    res.send(req.user);
});

router.delete("/users", passport.authenticate("jwt", { session: false}), (req, res, next) => {
    req.user.removeUser
    .then(user => {
        return res.send(user);
    }, err => {
        return next(err);
    })
});


module.exports = router;
