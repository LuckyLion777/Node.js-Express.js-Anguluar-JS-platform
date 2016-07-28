const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        require: true
    }
});

module.exports.imageSchema = imageSchema;