const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const router = require("express").Router();
const protectedRouter = require("express").Router();

protectedRouter.post("/location", mustbe.authorized("Create Location"), (req, res, next) => {
    models.Location.createLocation(req.body)
        .then(location => {
            return res.send(location);
        }, err => {
            return next(err);
        })
});

protectedRouter.put("/location/:locationId", mustbe.authorized("Update Location"), (req, res, next) => {
    req.params.location.updateLocation(req.body)
        .then(result => {
            return res.send(result);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/location/:locationId", mustbe.authorized("Delete Location"), (req, res, next) => {
    req.params.location.removeLocation()
        .then(location => {
            return res.send(location);
        }, err => {
            return next(err);
        })
});

router.get("/location/:locationId", (req, res, next) => {
    return res.send(req.params.location);
});

router.get("/locations", (req, res, next) => {
    models.Location.getLocations()
        .then(locations => {
            return res.send(locations);
        }, err => {
            return next(err);
        })
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
        }, err => {
            return next(err);
        })
};

protectedRouter.param("locationId", findLocation);

router.param("locationId", findLocation);



module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
