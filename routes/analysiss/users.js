const models        = require("../../models");
const router        = require("express").Router();

// GET: Number of all Users
router.get("/", (req, res, next) => {
    models.User.find().count({},function(err, count){
	    res.send({count: count});
	});
});

// GET: Number of active users
router.get("/active", (req, res, next) => {
    models.User.find().count({status:"ACTIVE"},function(err, count){
	    res.send({count: count});
	});
});

// GET: Number of buisiness users
router.get("/buisiness", (req, res, next) => {
    models.User.find().count({userType:"BUSINESSUSER"},function(err, count){
	    res.send({count: count});
	});
});

// GET: Number of regular users
router.get("/regular", (req, res, next) => {
    models.User.find().count({status:"USER"},function(err, count){
	    res.send({count: count});
	});
});

module.exports = router;