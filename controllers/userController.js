const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");
const upload = require("multer")({ dest: "uploads/user" });


router.post("/users/login", passport.authenticate("local", { session: false }), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => {
        if(err) {
            return next(err);
        } else {
            return res.send(jwt);
        }
    })
});

router.post("/users", upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { path: req.file.path };

    models.User.createUser(req.body, (err, user) => {
        user
            .then(user => {
                return res.send(user);
            }, err => {
                return next(err)
            });
    })
});

router.put("/users", passport.authenticate("jwt", { session: false }), upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { path: req.file.path };

    req.user.updateUser(req.body, (err, user) => {
        user
            .then(result => {
                return res.send(result);
            }, err => {
                return next(err);
            });
    })
});

router.get("/users", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.send(req.user);
});

router.delete("/users", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    req.user.removeUser
    .then(user => {
        return res.send(user);
    }, err => {
        return next(err);
    })
});


module.exports = router;
