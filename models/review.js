const mongoose = require("mongoose");
const commentSchema = require("./comment");
const AbstractUser = require("./abstractUser").AbstractUser;
const Language = require("./language").Language;

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AbstractUser",
        required: true,
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
    },
    body: {
        type: String,
        required: true,
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
        validate: {
            validator: (languageId, done) => {
                Language.count({ _id: languageId})
                    .then(count => {
                        return done(count);
                    }, err => {
                        //TODO: log
                        return done(false, err);
                    })
            },
            message: "Language Does Not Exist"
        }
    },
    comments: [ commentSchema ]
});

reviewSchema.methods.addComment = function (commentInfo) {
    this.comments.addToSet(commentInfo);
};

reviewSchema.methods.removeComment = function (commentId) {
    this.comments.pull(commentId);
};


module.exports.reviewSchema = reviewSchema;