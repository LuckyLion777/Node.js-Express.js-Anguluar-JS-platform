const models = require("../models");
const router = require("express").Router();
const _ = require("lodash");


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

    //search for requested model
    model = _.find(models, function(el, idx){

        if (idx.toLowerCase() == modelname) {
            console.log('found:', idx );
            return el;
        }
    });
    
    res.locals.promise = model.getAll()
        .where('_id').in(req.body)
        ;
    
    return next();
});


module.exports = router;
