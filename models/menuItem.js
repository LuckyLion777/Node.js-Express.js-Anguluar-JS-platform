const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is fired few times. Why?

    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
        type: Double,
    },
    image: {
        type: imageSchema,
    },
    viewNo: {
        type: Integer,
        //arr: [0],
    },
    sharesNo: {
        type: Integer,
        //arr: [0],
    },
    menuID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menuSection",
        required: true,
    },

});

module.exports = menuItemSchema;