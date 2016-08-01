const models = require("../models");
const protectedRouter = require("express").Router();
const router = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");


protectedRouter.post("/business", mustbe.authorized("Create Business"), (req, res, next) => {
    req.body.owner = req.user;

    models.Business.createBusiness(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.put("/business/:businessId", mustbe.authorized("Update Business"), (req, res, next) => {
    req.params.business.updateBusiness(req.body)
        .then(result => {
            return res.send(result);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId", mustbe.authorized("Delete Business"), (req, res, next) => {
    req.params.business.removeBusiness()
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

router.get("/business/:businessId", (req, res, next) => {
    return res.send(req.params.business);
});

router.get("/businesses", (req, res, next) => {
    models.Business.getBusinesses()
        .then(businesses => {
            return res.send(businesses);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/socialMedia", mustbe.authorized("Add Business Social Media"), (req, res, next) => {
    req.params.business.addSocialMedia(req.body)
        .then(business => {
            return res.send(business)
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/socialMedia/:socialMediaId", mustbe.authorized("Remove Business Social Media"), (req, res, next) => {
    req.params.business.removeSocialMedia(req.params.socialMediaId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/photo", mustbe.authorized("Add Business Photo"), (req, res, next) => {
    req.params.business.addPhoto(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/photo/:photoId", mustbe.authorized("Delete Business Photo"), (req, res, next) => {
    req.params.business.removePhoto(req.params.photoId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/tag", mustbe.authorized("Add Business Tag"), (req, res, next) => {
    req.params.business.addTag(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/tag/:tag", mustbe.authorized("Delete Business Tag"), (req, res, next) => {
    req.params.business.removeTag(req.params.tag)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/branch", mustbe.authorized("Add Business Branch"), (req, res, next) => {
    req.params.business.addBranch(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/branch/:branchId", mustbe.authorized("Delete Business Branch"), (req, res, next) => {
    req.params.business.removeBranch(req.params.branchId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/category", mustbe.authorized("Add Business Category"), (req, res, next) => {
    req.params.business.addCategory(req.body.category)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/category/:categoryId", mustbe.authorized("Remove Business Category"), (req, res, next) => {
    req.params.business.removeCategory(req.params.categoryId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/option", mustbe.authorized("Add Business Option"), (req, res, next) => {
    req.params.business.addOption(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/option/:optionId", mustbe.authorized("Delete Business Option"), (req, res, next) => {
    req.params.business.removeOption(req.params.optionId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/business/:businessId/review", mustbe.authorized("Add Business Review"), (req, res, next) => {
    req.body.user = req.user;

    req.params.business.addReview(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/review/:reviewId", mustbe.authorized("Remove Business Review"), (req, res, next) => {
    req.params.business.removeReview(req.params.reviewId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.post("/business/:businessId/review/:reviewId/comment", mustbe.authorized("Comment Business Review"), (req, res, next) => {
    req.body.user = req.user;

    try {
        req.params.business.addCommentToReview(req.params.reviewId, req.body)
            .then(business => {
                return res.send(business);
            }, err => {
                return next(err);
            })
    } catch(err) {
        next(new Error("Review Does Not Exist"));
    }
});

protectedRouter.delete("/business/:businessId/review/:reviewId/comment/:commentId", mustbe.authorized("Remove Comment On Business Review"), (req, res, next) => {
    try {
        req.params.business.removeCommentFromReview(req.params.reviewId, req.params.commentId)
            .then(business => {
                return res.send(business)
            }, err => {
                return next(err);
            })
    } catch(err) {
        return next(new Error("Review Does Not Exist"));
    }
});


protectedRouter.post("/business/:businessId/rating", mustbe.authorized("Add Business Rating"), (req, res, next) => {
    req.body.user = req.user;

    req.params.business.addRating(req.body)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/business/:businessId/rating/:ratingId", mustbe.authorized("Remove Business Rating"), (req, res, next) => {
    req.params.business.removeRating(req.params.ratingId)
        .then(business => {
            return res.send(business);
        }, err => {
            return next(err);
        })
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
        }, err => {
            return next(err);
        })
};

protectedRouter.param("businessId", findBusiness);

router.param("businessId", findBusiness);



module.exports = {
    protectedRouter: protectedRouter,
    router: router
};