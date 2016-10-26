const models = require("../models");
const router = require("express").Router();
const passport = require("passport");
const jwtGenerator = require("../util/jwtGenerator");
const upload = require("../config/multer");
const auth = require("../util/auth/index");


router.post("/", upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { filename: req.file.filename };

    models.Admin.createUser(req.body, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    })
});


router.get("/", passport.authenticate("jwt", {session: false}), auth.can("GET Admin"), (req, res, next) => {
    res.locals.promise = models.Admin.getAdmins();
    return next();
});

module.exports = router;
