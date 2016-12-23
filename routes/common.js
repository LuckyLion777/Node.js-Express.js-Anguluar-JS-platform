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
 * model _populate function must be present
 * TODO: not finished, complete it!
 * @param string model
 */
router.post("/:model/tags", (req, res, next) => {


    var modelname = req.params.model.toLowerCase();
    
    if ( ! _.includes(['business', 'event', 'article'], modelname) ) {
        
        throw "Requested model does not exist";
    }

    var model = getModel(modelname);
    
    res.locals.promise = model.getAll()
        //.elemMatch("tags", req.body)
        .where('tags').in("Indonesia")
        ;
    
    return next();
});


module.exports = router;
