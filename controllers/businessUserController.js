const models = require("../models");
const router = require("express").Router();

router.post("/businessUsers", function (req, res, next) {
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