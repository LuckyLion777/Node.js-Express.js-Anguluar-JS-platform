const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const imageSchema = require("./image");

//This Module Require In The End
//const Article = require("./article").Article;


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
    avatar: imageSchema
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
    return this.find().populate('bookmarks')
        .exec(function(err, user){
        });
};

abstractUserSchema.statics.getUser = function (userId) {
    return this.findById(userId).populate('bookmarks')
        .exec(function(err, user){
        });
};

abstractUserSchema.methods.activate = function () {
    return this.update({ status: STATUS.ACTIVE })
};

abstractUserSchema.methods.hold = function () {
    return this.update({ status: STATUS.PENDING })
};

abstractUserSchema.methods.block = function () {
    return this.update({ status: STATUS.BLOCKED })
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

abstractUserSchema.add({
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        validate: {
            validator: (articleId, done) => {
                Article.count({ _id: articleId })
                //TODO: log
                    .then(count => done(count), err => done(false, err));
            },
            message: "Article Does Not Exist"
        }
    }]
});