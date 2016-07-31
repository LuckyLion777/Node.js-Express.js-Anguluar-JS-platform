const mongoose = require("mongoose");
const User = require("./user").User;


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        validate: {
            validator: (userId, done) => {
                User.count({ _id: userId })
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
    comment: {
        type: String,
        required: true
    }
});

module.exports.commentSchema = commentSchema;