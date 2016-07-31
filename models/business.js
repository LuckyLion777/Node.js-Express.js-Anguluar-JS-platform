const mongoose = require("mongoose");
const imageSchema = require("./image").imageSchema;
const BusinessUser = require("./businessUser").BusinessUser;
const socialMediaSchema = require("./socialMedia").socialMediaSchema;
const branchSchema = require("./branch").branchSchema;
const optionSchema = require("./option").optionSchema;
const reviewSchema = require("./review").reviewSchema;
const ratingSchema = require("./rating").ratingSchema;
const validator = require("validator");


const businessSchema = new mongoose.Schema({
    businessUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessUser",
        required: true,
        validate: {
            validator: (userId, done) => {
                BusinessUser.count({ _id: userId })
                    .then(count => {
                        return done(count)
                    }, err => {
                        //TODO: log
                        return done(false, err)
                    })
            },
            message: "User Does Not Exist"
        }
    },
    arabicName: {
        type: String,
        required: true
    },
    englishName: {
        type: String,
        required: true
    },
    logo: imageSchema,
    arabicDescription: String,
    englishDescription: String,
    website: {
        type: String,
        validate: {
            validator: website => {
                return validator.isURL(website);
            },
            message: "Must Be a Valid URL"
        }
    },
    socialMedias: [ socialMediaSchema ],
    photos: [ imageSchema ],
    tags: [{
        type:String,
        //TODO: check the effect of these two
        required: true,
        unique: true
    }],
    branches: [ branchSchema ],
    //TODO: change this
    categories: [ String ],
    options: [ optionSchema ],
    reviews: [ reviewSchema ],
    ratings: [ ratingSchema ]
});


businessSchema.statics.createBusiness = function (businessInfo) {
    return this.create(businessInfo);
};

businessSchema.statics.getBusinesses = function () {
    return this.find();
};

businessSchema.methods.updateBusiness = function (businessInfo) {
    return this.update(businessInfo);
};

businessSchema.methods.removeBusiness = function () {
    return this.remove()
};


businessSchema.methods.addSocialMedia = function (socialMediaInfo) {
    this.socialMedias.addToSet(socialMediaInfo);
    return this.save();
};

businessSchema.methods.removeSocialMedia = function (socialMediaId) {
    this.socialMedias.pull(socialMediaId);
    return this.save();
};


businessSchema.methods.addPhoto = function (photoInfo) {
    this.photos.addToSet(photoInfo);
    return this.save();
};

businessSchema.methods.removePhoto = function (photoId) {
    this.photos.pull(photoId);
    return this.save();
};


businessSchema.methods.addTag = function (tagInfo) {
    this.tags.addToSet(tagInfo.tag);
    return this.save();
};

businessSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};


businessSchema.methods.addBranch = function (branchInfo) {
    this.branches.addToSet(branchInfo);
    return this.save();
};

businessSchema.methods.removeBranch = function (branchId) {
    this.branches.pull(branchId);
    return this.save();
};


branchSchema.methods.addOption = function (optionInfo) {
    this.options.addToSet(optionInfo);
    return this.save();
};

branchSchema.methods.removeOption = function (optionId) {
    this.options.pull(optionId);
    return this.save();
};


branchSchema.methods.addReview = function (reviewInfo) {
    this.reviews.addToSet(reviewInfo);
    return this.save();
};

branchSchema.methods.removeReview = function (reviewId) {
    this.reviews.pull(reviewId);
    return this.save();
};


branchSchema.methods.addRating = function (ratingInfo) {
    this.ratings.addToSet(ratingInfo);
    return this.save();
};

branchSchema.methods.removeRating = function (ratingId) {
    this.options.pull(ratingId);
    return this.save();
};


module.exports.businessSchema = businessSchema;

module.exports.Business = mongoose.model("Business", businessSchema);