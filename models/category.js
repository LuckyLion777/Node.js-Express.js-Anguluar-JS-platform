const mongoose = require("mongoose");
const imageSchema = require("./image");

const categorySchema = new mongoose.Schema({
    name: {
        arabicName: {
            type: String,
            required: true
        },
        englishName: {
            type: String,
            required: true
        }
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        validate: {
            validator: (categoryId, done) => {
                Category.count({ _id: categoryId })
                //TODO: Log
                    .then(count => done(count), err => done(false, err) )
            }
        }
    },
    icon: imageSchema
});

categorySchema.statics.createCategory = function(categoryInfo) {
    return this.create(categoryInfo);
};

categorySchema.statics.getCategories = function () {
    return this.find().populate('parent')
        .exec(function(err, user){
        });
};

const Category = mongoose.model("Category", categorySchema);

categorySchema.add({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        validate: {
            validator: (categoryId, callback) => {
                Category.count({ _id: categoryId})
                    .then(count => {
                        return callback(count);
                    }, err => {
                        //TODO: log
                        return callback(0, err);
                    })
            }
        }
    }
});



module.exports = {
    categorySchema: categorySchema,
    Category: Category
};


