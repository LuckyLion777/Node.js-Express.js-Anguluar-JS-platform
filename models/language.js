const mongoose = require("mongoose");


const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

languageSchema.methods.createLanguage = function (languageInfo) {
    return this.create(languageInfo);
};

module.exports.languageSchema = languageSchema;
module.exports.Language = mongoose.model("Language", languageSchema);