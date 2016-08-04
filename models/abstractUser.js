const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const imageSchema = require("./image");

const abstractUserSchema = new mongoose.Schema({
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
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: imageSchema,
});


abstractUserSchema.statics.createUser = function (userInfo, callback)  {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.create(userInfo))
        }
    })
};

abstractUserSchema.methods.updateUser = function (userInfo, callback) {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.update(userInfo, { runValidators: true }))
        }
    })
};

abstractUserSchema.methods.removeUser = function () {
    return this.remove()
};

abstractUserSchema.statics.getUsers = function () {
    return this.find();
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


module.exports = {
    abstractUserSchema: abstractUserSchema,
    AbstractUser: mongoose.model("abstractUserSchema", abstractUserSchema)
};