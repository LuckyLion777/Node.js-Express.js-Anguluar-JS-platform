const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const imageSchema = require("./image");
const User = require("./user").User;
const Language = require("./language").Language;

//This Module Require In The End
//const Article = require("./article").Article;


const STATUS = {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED"
};

const USER = {
    ADMIN: "Admin",
    BUSINESSUSER: "Business User",
    USER: "User"
};


const userSchema = new mongoose.Schema({
    subscription: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: [ USER.ADMIN, USER.BUSINESSUSER, USER.USER ],
        default: USER.USER
    },
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
        unique: false,
        select: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: imageSchema,
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
            },
            message: "Language Does Not Exist"
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
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        validate: {
            validator: (locationId, done) => {
                Location.count({ _id: locationId })
                //TODO: Log
                    .then(count => done(count), err => done(false, err) )
            }
        }
    },
    biography: String,
    phone: String,
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

            return callback(null, this.create(userInfo));
        }
    })
};

userSchema.methods.updateUser = function (userInfo, callback) {
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.update(userInfo));
        }
    })
};

userSchema.methods.resetUserPass = function (userInfo, callback) {
    userInfo.password = "12345";
    hashPassword(userInfo, (err) => {
        if(err) {
            return callback(err, null);
        } else {
            return callback(null, this.update(userInfo));
        }
    })
};

userSchema.methods.removeUser = function () {
    return this.remove();
};

userSchema.statics.getUsers = function () {
    return this.find().where("userType").ne("Admin").populate('bookmarks').populate('language');
};

userSchema.statics.getAdmins = function () {
    return this.find().where("userType").equals("Admin");
};

userSchema.statics.getUser = function (userId) {
    return this.findById(userId).populate('bookmarks').populate('language');
};

userSchema.statics.checkEmail = function (email) {
    //todo return custom message
    return this.findOne({email:email});


};

userSchema.statics.checkUsername = function (username) {
    //todo return custom message
    return this.findOne({username:username});

};

userSchema.methods.activate = function () {
    return this.update({ status: STATUS.ACTIVE })
};

userSchema.methods.hold = function () {
    return this.update({ status: STATUS.PENDING })
};

userSchema.methods.block = function () {
    return this.update({ status: STATUS.BLOCKED })
};

userSchema.methods.addBookmark = function (articleId) {
    this.bookmarks.addToSet(articleId);
    return this.save();
};

userSchema.methods.removeBookmark = function (articleId) {
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
    userSchema: userSchema,
    User: mongoose.model("User", userSchema)
};

const Article = require("./article").Article;

userSchema.add({
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