const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");
const upload = require("../config/multer");
const auth = require("../util/auth/index");

router.post("/", (req, res, next) => {

    models.User.createUser(req.body, (err, user) => {
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

router.put("/:userId", passport.authenticate("jwt", { session: false }),
    auth.can("Update User"), (req, res, next) => {
    req.body._id = req.params.userId;
    req.user.updateUser(req.body, (err, user) => {        
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    })
});

router.put("/:userId/reset", passport.authenticate("jwt", { session: false }),
    auth.can("Password Reset"), (req, res, next) => {
    req.params.user.resetUserPass(models.User.getUser(req.params.userId), (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    })
});

// router.put("/:userId", passport.authenticate("jwt", { session: false }),
//     auth.can("Update User"), (req, res, next) => {
//     req.params.user.updateUser(models.User.getUser(req.params.userId), (err, user) => {
//         if(err) {
//             return next(err);
//         } else {
//             res.locals.promise = user;
//             return next();
//         }
//     })
// });

router.delete("/:userId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove User"), (req, res, next) => {
	res.locals.promise = req.params.user.removeUser();
    return next();
});

router.get("/:userId", passport.authenticate("jwt", { session: false }),
    auth.can("List Users"), (req, res, next) => {

	res.locals.promise = models.User.getUser(req.params.userId);

    return next();
});


router.patch("/:userId/activate", passport.authenticate("jwt", {session: false}), auth.can("Activate User"), (req, res, next) => {
    res.locals.promise = req.params.user.activate();
    return next();
});

router.patch("/:userId/hold", passport.authenticate("jwt", {session: false}), auth.can("Hold User"), (req, res, next) => {
    res.locals.promise = req.params.user.hold();
    return next();
});

router.patch("/:userId/block", passport.authenticate("jwt", {session: false}), auth.can("Block User"), (req, res, next) => {
    res.locals.promise = req.params.user.block();
    return next();
});


router.route("/bookmark/:articleId")

    .post(passport.authenticate("jwt", {session: false}), auth.can("Add Bookmark"), (req, res, next) => {
        res.locals.promise = req.user.addBookmark(req.params.articleId);
        return next();
    })

    .delete(passport.authenticate("jwt", {session: false}), auth.can("Remove Bookmark"), (req, res, next) => {
        res.locals.promise = req.user.removeBookmark(req.params.articleId);
        return next();
    });


router.post("/login", passport.authenticate("local", {session: false}), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => err ? next(err) : res.send(jwt));
});


router.param("userId", (req, res, next, userId) => {
    models.User.findById(userId)
        .then(user => {
            if (!user) {
                return next(new Error("User Does Not Exist"));
            } else {
                req.params.user = user;
                return next();
            }
        }, err => next(err));
});


module.exports = router;