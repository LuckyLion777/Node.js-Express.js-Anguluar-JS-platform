const mongoose = require("mongoose");
const User = require("./user").User;

const businessUserSchema = User.discriminator("BusinessUser", new mongoose.Schema({
    //TODO: set range
    subscription: {
        type: String,
        required: true
    }
}));


module.exports = {
    businessUserSchema: businessUserSchema,
    BusinessUser: mongoose.model("BusinessUser", businessUserSchema)
};