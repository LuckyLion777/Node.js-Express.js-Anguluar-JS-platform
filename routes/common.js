const mongoose = require("mongoose");
const models = require("../models");
const router = require("express").Router();
const _ = require("lodash");

function getModel(modelname) {
    
    //search for requested model
    var model = _.find(models, function(el, idx){

        if (idx.toLowerCase() == modelname) {
            //console.log('found:', idx );
            return el;
        }
    });
    
    return model;
}

/**
 * get items with given IDs
 * model _populate function must be present
 * @param string model
 */
router.post("/:model/list", (req, res, next) => {


    var modelname = req.params.model.toLowerCase();
    
    if ( ! _.includes(['business', 'event', 'article', 'businesscategory', 'eventcategory'], modelname) ) {
        
        throw "Requested model does not exist";
    }

    var model = getModel(modelname);
    
    res.locals.promise = model.getAll()
        .where('_id').in(req.body)
        ;
    
    return next();
});

/**
 * get items with given tags
 * @param string model
 * @param array req.body
 */
router.post("/:model/tags", (req, res, next) => {


    var modelname = req.params.model.toLowerCase();
    
    if ( ! _.includes(['business', 'event', 'article'], modelname) ) {
        
        throw "Requested model does not exist";
    }

    //find corresponding tags
    res.locals.promise =  models.Tag.find(
        { $or: [
                {'tag.english': {$in: req.body } },
                {'tag.arabic': {$in: req.body } }
            ]
        })
        .then(result =>  {
            
            if ( _.isEmpty(result) ) {
    
                
                return next(new Error("tag(s) not found"));
            }
        
            var model = getModel(modelname),
                ids = _.map(result, function(obj){ return obj._id.toString(); })
                ;

                
            return model.getAll()
                .where({ 'tags': {$in: ids } });
            
        })
        ;
        
    return next();
    
});


module.exports = router;
