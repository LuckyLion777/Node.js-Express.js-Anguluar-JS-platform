const models = require("../models");
const router = require("express").Router();
const jwtGenerator = require("../util/jwtGenerator");
const upload = require("multer")({ dest: "uploads/user" });


router.post("/user", upload.single("avatar"), (req, res, next) => {
    if(req.file) req.body.avatar = { path: req.file.path };

    models.User.createUser(req.body, (err, user) => {
        user
            .then(user => {
                return res.send(user);
            }, err => {
                return next(err)
            });
    })
});


module.exports = router;
