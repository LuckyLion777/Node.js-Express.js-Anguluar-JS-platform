const mongoose = require("mongoose");
const imageSchema = require("./image");
const optionsSchema = require("./option");
const socialMediaSchema = require("./socialMedia");
const ratingSchema = require("./rating");
const commentSchema = require("./comment");
const AbstractUser = require("./abstractUser").AbstractUser;
const Category = require("./category").Category;
const validator = require("validator");

const eventSchema = new mongoose.Schema({
    title: {
        arabicTitle: {
            type: String,
            required: true
        },
        englishTitle: {
            type: String,
            required: true
        }
    },
    description: {
        arabicDescription: {
            type: String,
            required: true
        },
        englishDescription: {
            type: String,
            required: true
        }
    },
    host: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: String,
    location: {
        type: String,
        validation: {
            validator: location => {
                return validator.isURL(location);
            }
        }
    },
    phone: {
        type: Number,
        //TODO: validate
    },
    entranceFee: String,
    cover: imageSchema,
    options: [ optionsSchema ],
    socialMedias: [ socialMediaSchema ],
    attendants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AbstractUser",
        validate: {
            validator: (userId, done) => {
                AbstractUser.count({ _id: userId })
                    .then(count => {
                        return done(count)
                    }, err => {
                        //TODO: log
                        return done(false, err)
                    })
            },
            message: "AbstractUser Does Not Exist"
        }
    }],
    ratings: [ ratingSchema ],
    tags: [{
        type:String,
    }],
    comments: [ commentSchema ],
    photos: [ imageSchema ],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        validate: {
            validator: (categoryId, callback) => {
                Category.count({ _id: categoryId})
                    .then(count => {
                        return callback(count);
                    }, err => {
                        //TODO: log
                        return callback(0, err);
                    })
            },
            message: "Category Does Not Exist"
        }
    }],
});


eventSchema.statics.createEvent = function (eventInfo) {
    return this.create(eventInfo);
};

eventSchema.methods.updateEvent = function (eventInfo) {
    return this.update(eventInfo, { runValidators: true });
};

eventSchema.methods.removeEvent = function () {
    return this.remove();
};

eventSchema.statics.getEvents = function () {
    return this.find();
};


eventSchema.methods.addOption = function (optionInfo) {
    this.options.addToSet(optionInfo);
    return this.save();
};

eventSchema.methods.removeOption = function (optionId) {
    this.options.pull(optionId);
    return this.save();
};


eventSchema.methods.addSocialMedia = function (socialMediaInfo) {
    this.socialMedias.addToSet(socialMediaInfo);
    return this.save();
};

eventSchema.methods.removeSocialMedia = function (socialMediaId) {
    this.socialMedias.pull(socialMediaId);
    return this.save();
};


eventSchema.methods.addAttendant = function (attendantId) {
    this.attendants.addToSet(attendantId);
    return this.save()
};

eventSchema.methods.removeAttendant = function (attendantId) {
    this.attendants.pull(attendantId);
    return this.save();
};


eventSchema.methods.addRating = function (ratingInfo) {
    this.ratings.addToSet(ratingInfo);
    return this.save();
};

eventSchema.methods.removeRating = function (ratingId) {
    this.ratings.pull(ratingId);
    return this.save();
};


eventSchema.methods.addTag = function (tagInfo) {
    this.tags.addToSet(tagInfo.tag);
    return this.save();
};

eventSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};


eventSchema.methods.addComment = function (commentInfo) {
    this.comments.addToSet(commentInfo);
    return this.save();
};

eventSchema.methods.removeComment = function (commentId) {
    this.comments.pull(commentId);
    return this.save();
};


eventSchema.methods.addPhoto = function (photoInfo) {
    this.photos.addToSet(...photoInfo);
    return this.save();
};

eventSchema.methods.removePhoto = function (photoId) {
    this.photos.pull(photoId);
    return this.save();
};


eventSchema.methods.addCategory = function (categoryId) {
    this.categories.addToSet(categoryId);
    return this.save();
};

eventSchema.methods.removeCategory = function (categoryId) {
    this.categories.pull(categoryId);
    return this.save();
};


module.exports = {
    eventSchema: eventSchema,
    Event: mongoose.model("Event", eventSchema)
};

