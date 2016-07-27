const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.statics.createUser = function (userInfo, callback)  {
    userInfo.password = bcrypt.hashSync(userInfo.password);

    this.create(userInfo)
        .then( (user) => {
            return callback(null, user);
        }, (err) => {
            return callback(err, null);
        })
};

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model("User", userSchema);