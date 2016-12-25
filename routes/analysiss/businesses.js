const models        = require("../../models");
const router        = require("express").Router();
const moment        = require("moment");

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

//  GET: Number of of businesses (today, this week, this month, this year) 
// $gte: moment().startOf('day').toDate()

router.get("/date/today", (req, res, next) => {
    var promise = models.Business.find(
        {createdAt: {
                $gte: moment().startOf('day').toDate()
            }
        }            
    ).count(function(err, count){
	    res.send({count: count});
	});
    
    //res.locals.promise = promise;
    
    //return next();
});

router.get("/date/week", (req, res, next) => {
    models.Business.find(
        {
            createdAt: {
                $gte: moment().weekday(-7).toDate(),
                $lt: moment().startOf('day').toDate()
            }
        }            
        ).count(function(err, count){
	       res.send({count: count});
	    });
});

router.get("/date/month", (req, res, next) => {
    models.Business.find(
        {createdAt: {
                $gte: moment().weekday(-31).toDate(),
                $lt: moment().startOf('day').toDate()
            }
        }            
        ).count(function(err, count){
	    res.send({count: count});
	});
});

router.get("/date/year", (req, res, next) => {
    models.Business.find(
        {createdAt: {
                $gte: moment().weekday(-365).toDate(),
                $lt: moment().startOf('day').toDate()
            }
        }            
        ).count(function(err, count){
	    res.send({count: count});
	});
});

module.exports = router;