const mongoose = require("mongoose");
const User = require("./user").User;

const businessUserSchema = User.discriminator("BusinessUser", new mongoose.Schema({
}));

module.exports.BusinessUser = mongoose.model("BusinessUser", businessUserSchema);