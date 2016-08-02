const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

categorySchema.statics.createCategory = function(categoryInfo) {
    return this.create(categoryInfo);
};


module.exports.categorySchema = categorySchema;
const Category = mongoose.model("Category", categorySchema);
module.exports.Category = Category;


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