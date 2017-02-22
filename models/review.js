const mongoose = require("mongoose");
const commentSchema = require("./comment");
const User = require("./user").User;
const Language = require("./language").Language;

const reviewSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is fired few times. Why?

    placeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",
        required: true,
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true,
    },
    ratingGeneral: {
        type: Integer,
        enum: [ 0,1,2,3,4,5],
        default: 0,
        required: true,
    },
    ratingPrice: {
        type: Integer,
        enum: [ 1,2,3,4,5],
        default: 0,
    },
    ratingFood: {
        type: Integer,
        enum: [ 1,2,3,4,5],
        default: 0,
    },
    ratingService: {
        type: Integer,
        enum: [ 1,2,3,4,5],
        default: 0,
    },
    ratingClean: {
        type: Integer,
        enum: [ 1,2,3,4,5],
        default: 0,
    },
    writtenReview: {
        type: String,
        required: true,
    },
    time: {
        type: Timestamp,
        required: true,
    },

});

reviewSchema.methods.addComment = function (commentInfo) {
    this.comments.addToSet(commentInfo);
};

reviewSchema.methods.removeComment = function (commentId) {
    this.comments.pull(commentId);
};


module.exports = reviewSchema;