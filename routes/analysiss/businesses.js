const models        = require("../../models");
const router        = require("express").Router();

// GET: Number of all Business
router.get("/", (req, res, next) => {
    models.Business.find().count({},function(err, count){
	    res.send({count: count});
	});
});

// GET: Number of active businesses
router.get("/active", (req, res, next) => {
    models.Business.find().count({status:"APPROVED"},function(err, count){
	    res.send({count: count});
	});
});

// GET: Number of published businesses
router.get("/published", (req, res, next) => {
    models.Business.find().count({status:"PUBLISHED"},function(err, count){
	    res.send({count: count});
	});
});

// GET: Number of pending businesses
router.get("/pending", (req, res, next) => {
    models.Business.find().count({status:"PENDING"},function(err, count){
	    res.send({count: count});
	});
});

module.exports = router;