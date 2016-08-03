const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const protectedRouter = require("express").Router();



protectedRouter.post("/category", mustbe.authorized("Create Category"), (req, res, next) => {
    res.locals.promise = models.Category.createCategory(req.body);
    return next();
});


module.exports = {
    protectedRouter: protectedRouter
};
