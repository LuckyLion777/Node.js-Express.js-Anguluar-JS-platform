const models = require("../models");
const auth = require("../util/auth/index");
const passport = require("passport");
const router = require("express").Router();


router.post("/language", passport.authenticate("jwt", { session: false }),
    auth.can("Create Language"), (req, res, next) => {
    res.locals.promise = models.Language.create(req.body);
    return next();
});

router.put("/language/:languageId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Language"), (req, res, next) => {
    req.params.language.updateLanguage(req.body);
    return next();
});

router.delete("/language/:languageId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Language"), (req, res, next) => {
    req.params.language.removeLanguage();
    return next();
});

router.get("/language/:languageId", (req, res, next) => res.send(req.params.language) );

router.get("/languages", (req, res, next) => {
    res.locals.promise = models.Language.getLanguages();
    return next();
});


router.param("languageId", (req, res, next, languageId) => {
    models.Language.findById(languageId)
        .then(language => {
            if(!language) {
                return next(new Error("Language Does Not Exist"));
            } else {
                req.params.language = language;
                return next()
            }
        }, err => next(err))
});


module.exports = router;
