const mongoose = require("mongoose");
const AbstractUser = require("./abstractUser").AbstractUser;


const adminSchema = AbstractUser.discriminator("Admin", new mongoose.Schema());


module.exports = {
    adminSchema: adminSchema,
    Admin : mongoose.model("Admin", adminSchema)
};