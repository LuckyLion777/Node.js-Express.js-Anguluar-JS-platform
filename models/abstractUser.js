const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const imageSchema = require("./image");


const STATUS = {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED"
};


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
        unique: true,
        select: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: imageSchema,
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }]
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

abstractUserSchema.methods.activate = function () {
    return this.update({ status: STATUS.ACTIVE })
};

abstractUserSchema.methods.addBookmark = function (articleId) {
    this.bookmarks.addToSet(articleId);
    return this.save();
};

abstractUserSchema.methods.removeBookmark = function (articleId) {
    this.bookmarks.pull(articleId);
    return this.save();
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
    AbstractUser: mongoose.model("AbstractUser", abstractUserSchema)
};


const Article = require("./article").Article;
//TODO: log
abstractUserSchema.path("bookmarks").validate((articleId, done) => {
    Article.count({ _id: articleId })
        .then(count => done(count), err => done(false) );
});