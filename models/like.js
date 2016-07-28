const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        sparse: true
    }
});

module.exports.likeSchema = likeSchema;