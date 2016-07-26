var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
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

userSchema.statics.createUser = function (userInfo, callback) {
    userInfo.password = bcrypt.hashSync(userInfo.password);

    this.create(userInfo)
        .then(function (user) {
            return callback(null, user);
        }, function (err) {
            return callback(err, null);
        })
};

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model("User", userSchema);