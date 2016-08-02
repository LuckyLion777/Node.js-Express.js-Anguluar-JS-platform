const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Language = require("./language").Language;
const imageSchema = require("./image").imageSchema;

const STATUS = {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED"
};

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
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
        validate: {
            validator: (languageId, done) => {
                Language.count({ _id: languageId})
                    .then(count => {
                        return done(count);
                    }, err => {
                        //TODO: log
                        return done(false, err);
                    })
            }
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    //TODO: change this
    location: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: imageSchema,
    biography: String,
    phone: Number,
    status: {
        type: String,
        enum: [ STATUS.ACTIVE, STATUS.PENDING, STATUS.BLOCKED ],
        default: STATUS.PENDING
    }
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