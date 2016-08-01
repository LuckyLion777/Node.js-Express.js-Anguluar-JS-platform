const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const protectedRouter = require("express").Router();



protectedRouter.post("/category", mustbe.authorized("Admin"), (req, res, next) => {
    models.Category.createCategory(req.body)
        .then(category => {
            return res.send(category);
        }, err => {
            return next(err);
        })
});


module.exports = {
    protectedRouter: protectedRouter
};
