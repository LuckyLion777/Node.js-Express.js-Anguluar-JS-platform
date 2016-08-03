const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const router = require("express").Router();
const protectedRouter = require("express").Router();

protectedRouter.post("/location", mustbe.authorized("Create Location"), (req, res, next) => {
    res.locals.promise = models.Location.createLocation(req.body);
    return next();
});

protectedRouter.put("/location/:locationId", mustbe.authorized("Update Location"), (req, res, next) => {
    res.locals.promise = req.params.location.updateLocation(req.body);
    return next();
});

protectedRouter.delete("/location/:locationId", mustbe.authorized("Delete Location"), (req, res, next) => {
    res.locals.promise = req.params.location.removeLocation();
    return next();
});

router.get("/location/:locationId", (req, res, next) => res.send(req.params.location) );

router.get("/locations", (req, res, next) => {
    res.locals.promise = models.Location.getLocations();
    return next();
});


const findLocation = (req, res, next, locationId) => {
    models.Location.findById(locationId)
        .then(location => {
            if(!location) {
                return next(new Error("Location Does Not Exist"));
            }  else {
                req.params.location = location;
                return next();
            }
        }, err => next(err) )
};

protectedRouter.param("locationId", findLocation);

router.param("locationId", findLocation);



module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
