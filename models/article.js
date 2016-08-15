const mongoose = require("mongoose");
const imageSchema = require("./image");
const commentSchema = require("./comment");
const AbstractUser = require("./abstractUser").AbstractUser;
const Language = require("./language").Language;
const Collection = require("./collection").Collection;


const STATUS = {
    APPROVED: "APPROVED",
    PROVOKED: "PROVOKED",
    PENDING: "PENDING",
    ONHOLD: "ONHOLD"
};

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AbstractUser",
        required: true,
        validate: {
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
        }
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
            },
            message: "Language Does Not Exist"
        }
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        validate: {
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
        }
    }],
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
    comments: [ commentSchema ],
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        validate: {
            validator: (collectionId, done) => {
                Collection.count({ _id: collectionId })
                    .then( count => done(count) , err => done(false, err) )
            },
            message: "Collection Does Not Exist"
        }
    }]
}, { timestamps: true });


articleSchema.statics.createArticle = function (articleInfo) {
    return this.create(articleInfo)
};

articleSchema.methods.updateArticle = function (articleInfo) {
    return this.update(articleInfo, { runValidators: true });
};

articleSchema.methods.removeArticle = function () {
    return this.remove();
};

articleSchema.statics.getArticles = function () {
    return this.find();
};

articleSchema.statics.getFilteredArticles = function (status) {
    return this.find({ status: status });
};

articleSchema.methods.addComment = function (commentInfo) {
    this.comments.addToSet(commentInfo);
    return this.save();
};

articleSchema.methods.removeComment = function (commentId) {
    this.comments.pull(commentId);
    return this.save();
};


articleSchema.methods.addPhoto = function (photosInfo) {
    this.photos.addToSet(...photosInfo);
    return this.save();
};

articleSchema.methods.removePhoto = function (photoId) {
    this.photos.pull(photoId);
    return this.save();
};


articleSchema.methods.addTag = function (tagInfo) {
    this.tags.addToSet(tagInfo.tag);
    return this.save();
};

articleSchema.methods.removeTag = function (tag) {
    this.tags.pull(tag);
    return this.save();
};


articleSchema.methods.like = function (userId) {
    this.likes.addToSet(userId);
    return this.save();
};

articleSchema.methods.unlike = function (userId) {
    this.likes.pull(userId);
    return this.save();
};


articleSchema.methods.publish = function () {
    this.published = true;
    return this.save();
};


articleSchema.methods.approve = function () {
    this.status = STATUS.APPROVED;
    return this.save();
};

articleSchema.methods.hold = function () {
    this.status = STATUS.ONHOLD;
    return this.save();
};

articleSchema.methods.suspend = function () {
    this.status = STATUS.PENDING;
    return this.save();
};

articleSchema.methods.provoke = function () {
    this.status = STATUS.PROVOKED;
    return this.save()
};


articleSchema.methods.addCollection = function (collectionInfo) {
    this.collections.addToSet(collectionInfo);
    return this.save();
};

articleSchema.methods.removeCollection = function (collectionId) {
    this.collections.pull(collectionId);
    return this.save();
};


module.exports = {
    articleSchema: articleSchema,
    Article: mongoose.model("Article", articleSchema)
};