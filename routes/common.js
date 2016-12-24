const mongoose = require("mongoose");
const models = require("../models");
const router = require("express").Router();
const _ = require("lodash");

var modelname = 'article';

    ////find corresponding tags
    //models.Tag.find(
    //    { $or: [
    //            {'tag.english': {$in: [ "red", "tag" ] } },
    //            {'tag.arabic': {$in: [ "red", "tag" ] } }
    //        ]
    //    })
    //    .then(result =>  {
    //        
    //        if ( _.isEmpty(result) ) {
    //
    //            
    //            return next(new Error("tag(s) not found"));
    //        }
    //    
    //        var model = getModel(modelname),
    //            ids = _.map(result, function(obj){ return obj._id.toString(); })
    //            ;
    //            
    //        //find models contained found tags
    //        return model.aggregate([
    //        
    //            { "$match":
    //                { tags:
    //                    {
    //                        $elemMatch: {$in: ids }
    //                    }
    //                }
    //            }
    //            //,{ "$unwind": "$tags" }
    //            ,{
    //                "$lookup": {
    //                    "from": "tags",
    //                    "localField": "tag",
    //                    "foreignField": "id",
    //                    "as": "tags"
    //                }
    //            }
    //            //,{ "$group": {
    //            //    "_id": "$_id",
    //            //    "tags": { "$push": "$$ROOT" },
    //            //}}
    //
    //        ])
    //        ;
    //        
    //    })
    //    .then(result =>  {
    //
    //        console.log('result1:', result );
    //
    //        //return models.Tag.find();
    //    })
        //.then(result =>  {
        //
        //    //console.log('tags:',  );
        //    console.log('result:', result );
        //
        //})
        //.catch(err => {
        //    
        //    return next(new Error(err));
        //});
        ;


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

    console.log('find for:', req.body);
    
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

    console.log('found tag ids:', ids);
                
                
            //find models contained found tags
            return model.aggregate([
            
                { "$match":
                    { tags:
                        {
                            $elemMatch: {$in: ids }
                        }
                    }
                }
                //,{ "$unwind": "$tags" }
                //,{
                //    "$lookup": {
                //        "from": "tags",
                //        "localField": "tag",
                //        "foreignField": "id",
                //        "as": "tags"
                //    }
                //}
                //,{ "$group": {
                //    "_id": "$_id",
                //    "tags": { "$push": "$$ROOT" },
                //}}
    
            ])
            ;
            
            
        })
        //.catch(err => {
        //    
        //    return next(new Error(err));
        //});
        ;
        
    return next();
    
});


module.exports = router;
