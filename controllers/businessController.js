const models = require("../models");
const protectedRouter = require("express").Router();
const router = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");


protectedRouter.post("/business", mustbe.authorized("Create Business"), (req, res, next) => {
    req.body.owner = req.user;

    models.Business.createBusiness(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.put("/business/:businessId", mustbe.authorized("Update Business"), (req, res, next) => {
    req.params.business.updateBusiness(req.body)
        .then(result => {
            return res.send(result);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId", mustbe.authorized("Delete Business"), (req, res, next) => {
    req.params.business.removeBusiness()
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

router.get("/business/:businessId", (req, res, next) => {
    return res.send(req.params.business);
});

router.get("/businesses", (req, res, next) => {
    models.Business.getBusinesses()
        .then(businesses => {
            return res.send(businesses);
        }, err => {
            return next(err);
        })
});





const findBusiness = (req, res, next, bossinessId) => {
    models.Business.findById(bossinessId)
        .then(business => {
            if(!business) {
                return next(new Error("Business Does Not Exist"));
            } else {
                req.params.business = business;
                return next();
            }
        }, err => {
            return next(err);
        })
};

protectedRouter.param("businessId", findBusiness);

router.param("businessId", findBusiness);



module.exports = {
    protectedRouter: protectedRouter,
    router: router
};