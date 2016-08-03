const models = require("../models");
const protectedRouter = require("express").Router();
const router = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const upload = require("multer")({ dest: "uploads/business" });


protectedRouter.post("/business", mustbe.authorized("Create Business"), upload.single("logo"), (req, res, next) => {
    req.body.owner = req.user;
    if(req.file) req.body.logo = { path: req.file.path };

    res.locals.promise = models.Business.createBusiness(req.body);
    return next();
});

protectedRouter.put("/business/:businessId", upload.single("logo"), mustbe.authorized("Update Business"), (req, res, next) => {
    if(req.file) req.body.logo = { path: req.file.path };

    res.locals.promise = req.params.business.updateBusiness(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId", mustbe.authorized("Delete Business"), (req, res, next) => {
    req.params.business.removeBusiness();
    return next();
});

router.get("/business/:businessId", (req, res, next) => res.send(req.params.business) );

router.get("/businesses", (req, res, next) => {
    res.locals.promise = models.Business.getBusinesses();
    return next();
});


protectedRouter.post("/business/:businessId/socialMedia", mustbe.authorized("Add Business Social Media"), (req, res, next) => {
    req.params.business.addSocialMedia(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId/socialMedia/:socialMediaId", mustbe.authorized("Remove Business Social Media"), (req, res, next) => {
    req.params.business.removeSocialMedia(req.params.socialMediaId);
    return next();
});

//TODO: set a limit of the number of uploads
protectedRouter.post("/business/:businessId/photo", upload.array("photo"), mustbe.authorized("Add Business Photo"), (req, res, next) => {
    try {
        res.locals.promise = req.params.business.addPhoto(req.files.map(photo => ({ path: photo.path }) ));
        return next();
    } catch(err) {
        return next(new Error("You Should Use Form-Data Encoding Only With This End Point"))
    }
});

protectedRouter.delete("/business/:businessId/photo/:photoId", mustbe.authorized("Delete Business Photo"), (req, res, next) => {
    res.locals.promise = req.params.business.removePhoto(req.params.photoId);
    return next();
});


protectedRouter.post("/business/:businessId/tag", mustbe.authorized("Add Business Tag"), (req, res, next) => {
    res.locals.promise = req.params.business.addTag(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId/tag/:tag", mustbe.authorized("Delete Business Tag"), (req, res, next) => {
    res.locals.promise = req.params.business.removeTag(req.params.tag);
    return next();
});


protectedRouter.post("/business/:businessId/branch", mustbe.authorized("Add Business Branch"), (req, res, next) => {
    res.locals.promise = req.params.business.addBranch(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId/branch/:branchId", mustbe.authorized("Delete Business Branch"), (req, res, next) => {
    res.locals.promise = req.params.business.removeBranch(req.params.branchId);
    return next();
});


protectedRouter.post("/business/:businessId/category", mustbe.authorized("Add Business Category"), (req, res, next) => {
    res.locals.promise = req.params.business.addCategory(req.body.category);
    return next();
});

protectedRouter.delete("/business/:businessId/category/:categoryId", mustbe.authorized("Remove Business Category"), (req, res, next) => {
    res.locals.promise = req.params.business.removeCategory(req.params.categoryId);
    return next();
});


protectedRouter.post("/business/:businessId/option", mustbe.authorized("Add Business Option"), (req, res, next) => {
    res.locals.promise = req.params.business.addOption(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId/option/:optionId", mustbe.authorized("Delete Business Option"), (req, res, next) => {
    res.locals.promise = req.params.business.removeOption(req.params.optionId);
    return next();
});


protectedRouter.post("/business/:businessId/review", mustbe.authorized("Add Business Review"), (req, res, next) => {
    req.body.user = req.user;

    res.locals.promise = req.params.business.addReview(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId/review/:reviewId", mustbe.authorized("Remove Business Review"), (req, res, next) => {
    res.locals.promise = req.params.business.removeReview(req.params.reviewId);
    return next();
});

protectedRouter.post("/business/:businessId/review/:reviewId/comment", mustbe.authorized("Comment Business Review"), (req, res, next) => {
    req.body.user = req.user;

    try {
        res.locals.promise = req.params.business.addCommentToReview(req.params.reviewId, req.body)
        return next();
    } catch(err) {
        return next(new Error("Review Does Not Exist"));
    }
});

protectedRouter.delete("/business/:businessId/review/:reviewId/comment/:commentId", mustbe.authorized("Remove Comment On Business Review"), (req, res, next) => {
    try {
        res.locals.promise = req.params.business.removeCommentFromReview(req.params.reviewId, req.params.commentId)
        return next();
    } catch(err) {
        return next(new Error("Review Does Not Exist"));
    }
});


protectedRouter.post("/business/:businessId/rating", mustbe.authorized("Add Business Rating"), (req, res, next) => {
    req.body.user = req.user;

    res.locals.promise = req.params.business.addRating(req.body);
    return next();
});

protectedRouter.delete("/business/:businessId/rating/:ratingId", mustbe.authorized("Remove Business Rating"), (req, res, next) => {
    res.locals.promise = req.params.business.removeRating(req.params.ratingId);
    return next();
});


const findBusiness = (req, res, next, bossinessId) => {
    models.Business.findById(bossinessId)
        .then(business => {
            if(!business) {
                return next(new Error("Business Does Not Exist"));
            } else {
                req.params.business = business;
                return next();
            }
        }, err => next(err) )
};

protectedRouter.param("businessId", findBusiness);

router.param("businessId", findBusiness);



module.exports = {
    protectedRouter: protectedRouter,
    router: router
};