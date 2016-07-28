const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
});

userSchema.statics.createUser = function (userInfo, callback)  {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.create(userInfo))
        }
    })
};

userSchema.methods.updateUser = function (userInfo, callback) {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.update(userInfo))
        }
    })
};

userSchema.methods.removeUser = function () {
    return this.remove()
};

const hashPassword = (userInfo, callback) => {
    if(!userInfo.password) {
        return callback();
    } else {
        bcrypt.hash(userInfo.password, 10, (err, hashedPassword) => {
            if(err) {
                return callback(err);
            } else {
                userInfo.password = hashedPassword;
                return callback()
            }
        });
    }
};

module.exports.userSchema = userSchema;
module.exports.User = mongoose.model("User", userSchema);