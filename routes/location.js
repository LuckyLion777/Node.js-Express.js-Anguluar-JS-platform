const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const router = require("express").Router();

router.post("/location", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Create Location"), (req, res, next) => {
    res.locals.promise = models.Location.createLocation(req.body);
    return next();
});

router.put("/location/:locationId", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Update Location"), (req, res, next) => {
    res.locals.promise = req.params.location.updateLocation(req.body);
    return next();
});

router.delete("/location/:locationId", passport.authenticate("jwt", { session: false }),
    mustbe.authorized("Delete Location"), (req, res, next) => {
    res.locals.promise = req.params.location.removeLocation();
    return next();
});

router.get("/location/:locationId", (req, res, next) => res.send(req.params.location) );

router.get("/locations", (req, res, next) => {
    res.locals.promise = models.Location.getLocations();
    return next();
});


router.param("locationId", (req, res, next, locationId) => {
    models.Location.findById(locationId)
        .then(location => {
            if(!location) {
                return next(new Error("Location Does Not Exist"));
            }  else {
                req.params.location = location;
                return next();
            }
        }, err => next(err) )
});


module.exports = router;
