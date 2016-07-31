const mongoose = require("mongoose");
const User = require("./user").User;

const businessUserSchema = User.discriminator("BusinessUser", new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
}));


module.exports.BusinessUser = mongoose.model("BusinessUser", businessUserSchema);