const models = require("../models");
const router = require("express").Router();


router.post("/businessUsers", function (req, res, next) {
    models.BusinessUser.createUser(req.body, (err, user) => {
        if(err) {
            return next(err, null);
        } else {
            return res.send(user);
        }
    })
});


module.exports = router;