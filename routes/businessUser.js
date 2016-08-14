const models = require("../models");
const router = require("express").Router();
const upload = require("../config/multer");


router.post("/", upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { filename: req.file.filename };

    models.BusinessUser.createUser(req.body, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    })
});


module.exports = router;