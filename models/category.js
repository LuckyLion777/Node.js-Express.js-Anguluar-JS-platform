const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

categorySchema.add({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        validate: {
            validator: (categoryId, callback) => {
                this.count({ _id: categoryId})
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

categorySchema.statics.createCategory = function(categoryInfo) {
    return this.create(categoryInfo);
};


module.exports.categorySchema = categorySchema;
module.exports.Category = mongoose.model("Category", categorySchema);