const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const router = require("express").Router();
const passport = require("passport");



router.post("/collection", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Create Collection"), (req, res, next) => {
    res.locals.promise = models.Collection.createCollection(req.body);
    return next();
});

router.put("/collection/:collectionId", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Update Collection"), (req, res, next) => {
    res.locals.promise = req.params.collection.updateCollection(req.body);
    return next();
});

router.delete("/collection/:collectionId", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Remove Collection"), (req, res, next) => {
    res.locals.promise = req.params.collection.removeCollection();
    return next();
});

router.get("/collection/:collectionId", (req, res, next) => res.send(req.params.collection) );

router.get("/collections", (req, res, next) => {
    res.locals.promise = models.Collection.getCollections();
    return next();
});


router.param("collectionId", (req, res, next, collectionId) => {
    models.Collection.findById(collectionId)
        .then( collection => {
            if(!collection) {
                return next(new Error("Collection Does Not Exist"));
            } else {
                req.params.collection = collection;
                return next();
            }
        }, err => next(err) )
});


module.exports = router;
