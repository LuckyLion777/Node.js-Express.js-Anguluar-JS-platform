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


