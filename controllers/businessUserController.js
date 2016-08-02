const models = require("../models");
const router = require("express").Router();
const upload = require("multer")({ dest: "uploads/businessUsers" });

router.post("/businessUsers", upload.single("avatar"), function (req, res, next) {
    if(req.file) req.body.avatar = { path: req.file.path };

    models.BusinessUser.createUser(req.body, (err, user) => {
        user
            .then(user => {
                return res.send(user);
            }, err => {
                return next(err, null);
            })
    })
});




module.exports = {
    router: router
};