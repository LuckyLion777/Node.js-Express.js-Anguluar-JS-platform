const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const protectedRouter = require("express").Router();
const router = require("express").Router();



protectedRouter.post("/collection", mustbe.authorized("Create Collection"), (req, res, next) => {
    res.locals.promise = models.Collection.createCollection(req.body);
    return next();
});

protectedRouter.put("/collection/:collectionId", mustbe.authorized("Update Collection"), (req, res, next) => {
    res.locals.promise = req.params.collection.updateCollection(req.body);
    return next();
});

protectedRouter.delete("/collection/:collectionId", mustbe.authorized("Remove Collection"), (req, res, next) => {
    res.locals.promise = req.params.collection.removeCollection();
    return next();
});

router.get("/collection/:collectionId", (req, res, next) => res.send(req.params.collection) );

router.get("/collections", (req, res, next) => {
    res.locals.promise = models.Collection.getCollections();
    return next();
});


const findCollection = (req, res, next, collectionId) => {
    models.Collection.findById(collectionId)
        .then( collection => {
            if(!collection) {
                return next(new Error("Collection Does Not Exist"));
            } else {
                req.params.collection = collection;
                return next();
            }
        }, err => next(err) )
};

protectedRouter.param("collectionId", findCollection);

router.param("collectionId", findCollection);


module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
