const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports.commentSchema = commentSchema;