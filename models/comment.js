const mongoose = require("mongoose");
const AbstractUser = require("./abstractUser").AbstractUser;
const Language = require("./language").Language;


const commentSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        required: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
        validate: {
            validator: (languageId, done) => {
                Language.count({ _id: languageId })
                    .then(count => {
                        return done(count);
                    }, err => {
                        //TODO: log
                        return done(false, err);
                    })
            },
            message: "Language Does Not Exist"
        }
    }
});


module.exports = commentSchema;