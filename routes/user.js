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
    });
});


/***** Current user operations ************/

router.post("/login", passport.authenticate("local", {session: false}), (req, res, next) => {
    jwtGenerator.generateJwt(req.user.id, (err, jwt) => err ? next(err) : res.send(jwt));
});


router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    return res.send(req.user);
});

router.put("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    req.user.updateUser(req.body, (err, user) => {        
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    });
});


/** Add tags to current user
 * @param JSON tags - tag ids
 */
router.post("/tag", passport.authenticate("jwt", { session: false }),
    //auth.can("Add Tag"),
    (req, res, next) => {
        res.locals.promise = req.user.addTag(req.body);
        return next();
});

router.delete("/tag/:tagId", passport.authenticate("jwt", { session: false }),
    
    //auth.can("Remove Tag"),
    (req, res, next) => {
        res.locals.promise = req.user.removeTag(req.params.tagId);
        return next();
    });


router.get("/favorite", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    return res.send(req.user.favorites);
});

/*
/** Add favorites to current user
 * @param JSON favorites - business ids
 */
router.post("/favorite", passport.authenticate("jwt", { session: false }),
    //auth.can("Add Favorite"), //TODO: do we need permissions check here?
    (req, res, next) => {

        res.locals.promise = req.user.addFavorite(req.body);
        return next();
});

router.delete("/favorite/:favoriteId", passport.authenticate("jwt", {session: false}), auth.can("Remove Favorite"), (req, res, next) => {
    res.locals.promise = req.user.removeFavorite(req.params.favoriteId);
    return next();
});
    

router.get("/bookmark", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    return res.send(req.user.bookmarks);
});

/** Add bookmarks to current user
 * @param JSON favorites - business ids
 */
router.post("/bookmark", passport.authenticate("jwt", { session: false }),
    //auth.can("Add Bookmark"), //TODO: do we need permissions check here?
    (req, res, next) => {

        res.locals.promise = req.user.addBookmark(req.body);
        return next();
});

router.delete("/bookmark/:articleId", passport.authenticate("jwt", {session: false}), auth.can("Remove Favorite"), (req, res, next) => {
    //auth.can("Remove Bookmark"), //TODO: do we need permissions check here?
    res.locals.promise = req.user.removeBookmark(req.params.favoriteId);
    return next();
});


/*** Operations with selected user ******/
router.put("/:userId", passport.authenticate("jwt", { session: false }),
    auth.can("Update User"), (req, res, next) => {
    req.params.user.updateUser(req.body, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    });
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
    });
});

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