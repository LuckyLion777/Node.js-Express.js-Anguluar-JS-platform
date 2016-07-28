const mongoose = require("mongoose");
const imageSchema = require("./image").imageSchema;
const likeSchema = require("./like").likeSchema;
const commentSchema = require("./comment").commentSchema;
const models = require("../models");


const STATUS = {
    APPROVED: "APPROVED",
    PROVOKED: "PROVOKED",
    PENDING: "PENDING",
    ONHOLD: "ONHOLD"
};

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: (userId, done) => {
                models.User.count({ id: userId })
                    .then(count => {
                        return done(count)
                    }, err => {
                        //TODO: log
                        return done(false)
                    })
            },
            message: "User Does Not Exist"
        }
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
        validate: {
            validator: (languageId, done) => {
                models.Language.count({ id: languageId})
                    .then(count => {
                        return done(count);
                    }, err => {
                        //TODO: log
                        return done(false);
                    })
            }
        }
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [ STATUS.APPROVED, STATUS.PROVOKED, STATUS.PENDING, STATUS.ONHOLD ],
        default: STATUS.PENDING
    },
    tags: [ String ],
    cover: imageSchema,
    published: Boolean,
    photos: [ imageSchema ],
    likes: [ likeSchema ],
    comments: [ commentSchema ]
}, { timestamps: true });

articleSchema.statics.createArticle = function (articleInfo) {
    return this.create(articleInfo)
};

articleSchema.methods.updateArticle = function (articleInfo) {
    return this.update(articleInfo, { runValidators: true });
};

articleSchema.methods.removeArticle = function () {
    return this.delete();
};


articleSchema.methods.addTag = function (tag) {
    this.tags.addToSet(tag);
    return this.save();
};

articleSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};


articleSchema.methods.addPhoto = function (photo) {
    this.photos.addToSet(photo);
    return this.save();
};

articleSchema.methods.addPhoto = function (photo) {
    this.photos.pull(photo);
    return this.save();
};


module.exports.articleSchema = articleSchema;
module.exports.Article = mongoose.model("Article", articleSchema);