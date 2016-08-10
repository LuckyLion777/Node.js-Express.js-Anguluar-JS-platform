const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");
const upload = require("multer")({ dest: "uploads/user" });
const auth = require("../util/auth/index");


router.put("/", passport.authenticate("jwt", { session: false }), upload.single("avatar"), (req, res, next) => {
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

router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    return res.send(req.user);
});

router.delete("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.locals.promise = req.user.removeUser;
    return next();
});


router.patch("/:userId/activate", passport.authenticate("jwt", { session: false }), auth.can("Activate User"), (req, res, next) => {
    res.locals.promise = req.params.user.activate();
    return next();
});


router.post("/bookmark/:articleId", passport.authenticate("jwt", { session: false }), auth.can("Add Bookmark"), (req, res, next) => {
    res.locals.promise = req.user.addBookmark(req.params.articleId);
    return next();
});

router.delete("/bookmark/:articleId", passport.authenticate("jwt", { session: false }), auth.can("Remove Bookmark"), (req, res, next) => {
    res.locals.promise = req.user.removeBookmark(req.params.articleId);
    return next();
});


router.post("/login", passport.authenticate("local", { session: false }), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => err ? next(err): res.send(jwt) );
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