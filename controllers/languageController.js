const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const protectedRouter = require("express").Router();


protectedRouter.post("/language", mustbe.authorized("Admin"), (req, res, next) => {
    models.Language.create(req.body)
        .then(language => {
            return res.send(language);
        }, err => {
            return next(err);
        })
});


module.exports = {
    protectedRouter: protectedRouter
};
