const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const protectedRouter = require("express").Router();
const router = require("express").Router();


protectedRouter.post("/language", mustbe.authorized("Create Language"), (req, res, next) => {
    res.locals.promise = models.Language.create(req.body);
    return next();
});

protectedRouter.put("/language/:languageId", mustbe.authorized("Update Language"), (req, res, next) => {
    req.params.language.updateLanguage(req.body);
    return next();
});

protectedRouter.delete("/language/:languageId", mustbe.authorized("Remove Language"), (req, res, next) => {
    req.params.language.removeLanguage();
    return next();
});

router.get("/language/:languageId", (req, res, next) => res.send(req.params.language) );

router.get("/languages", (req, res, next) => {
    res.locals.promise = models.Language.getLanguages();
    return next();
});


const findLanguage = (req, res, next, languageId) => {
    models.Language.findById(languageId)
        .then(language => {
            if(!language) {
                return next(new Error("Language Does Not Exist"));
            } else {
                req.params.language = language;
                return next()
            }
        }, err => next(err))
};

protectedRouter.param("languageId", findLanguage);

router.param("languageId", findLanguage);

module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
