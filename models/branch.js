const mongoose = require("mongoose");
const validator = require("validator");

const branchSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
        //TODO: validate
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            }
        }
    },
    location: {
        type: String,
        required: true,
        validate: {
            validator: location => {
                return validator.isURL(location);
            },
            message: "Must Be a Valid URL"
        }
    },
    arabicAddress: String,
    englishAddress: String,
    ArabicOpeningHours: String,
    EnglishOpeningHours: String
});

module.exports = branchSchema;