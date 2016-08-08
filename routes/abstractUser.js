const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");
const upload = require("multer")({ dest: "uploads/user" });
const auth = require("../util/auth/index");


router.post("/user/login", passport.authenticate("local", { session: false }), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => err ? next(err): res.send(jwt));
});

router.put("/user", passport.authenticate("jwt", { session: false }), upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { path: req.file.path };

    req.user.updateUser(req.body, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    })
});

router.get("/user", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    return res.send(req.user);
});

router.get("/users", passport.authenticate("jwt", { session: false }), auth.can("List Users"), (req, res, next) => {
    res.locals.promise = models.AbstractUser.getUsers();
    return next();
});

router.delete("/user", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.locals.promise = req.user.removeUser;
    return next();
});

router.patch("/user/:userId/activate", passport.authenticate("jwt", { session: false }), auth.can("Activate User"), (req, res, next) => {
    res.locals.promise = req.params.user.activate();
    return next();
});


router.param("userId", (req, res, next, userId) => {
    models.AbstractUser.findById(userId)
        .then(user => {
            if(!user) {
                return next(new Error("User Does Not Exist"));
            } else {
                req.params.user = user;
                return next();
            }
        }, err => next(err));
});


module.exports = router;