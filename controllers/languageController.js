const models = require("../models");
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const protectedRouter = require("express").Router();
const router = require("express").Router();


protectedRouter.post("/language", mustbe.authorized("Create Language"), (req, res, next) => {
    models.Language.create(req.body)
        .then(language => {
            return res.send(language);
        }, err => {
            return next(err);
        })
});

protectedRouter.put("/language/:languageId", mustbe.authorized("Update Language"), (req, res, next) => {
    req.params.language.updateLanguage(req.body)
        .then(result => {
            return res.send(result);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/language/:languageId", mustbe.authorized("Remove Language"), (req, res, next) => {
    req.params.language.removeLanguage()
        .then(language => {
            return res.send(language);
        }, err => {
            return next(err);
        })
});

router.get("/language/:languageId", (req, res, next) => {
    return res.send(req.params.language);
});

router.get("/languages", (req, res, next) => {
    models.Language.getLanguages()
        .then(languages => {
            return res.send(languages);
        }, err => {
            return next(err);
        })
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
        }, err => {
            return next(err);
        })
};

protectedRouter.param("languageId", findLanguage);

router.param("languageId", findLanguage);

module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
