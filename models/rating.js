const mongoose = require("mongoose");
const AbstractUser = require("./abstractUser").AbstractUser;

const ratingSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AbstractUser",
        required: true
/*        validate: {
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
        }*/
    },
    rating: {
        type: Number,
        min: [0, "The Rating Must Be Positive"],
        max: [5, "The Rating Must Not Exceeds 5"],
        required: true
    }
});

module.exports = ratingSchema;