const models = require("../models");
const router = require("express").Router();
const upload = require("multer")({ dest: "uploads/admin" });


router.post("/admin", upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { path: req.file.path };

    models.Admin.createUser(req.body, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.locals.promise = user;
            return next();
        }
    })
});


module.exports = router;
