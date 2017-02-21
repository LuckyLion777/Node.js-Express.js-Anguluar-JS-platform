const mongoose = require("mongoose");
const validator = require("validator");

const branchSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is firedfew times. Why?

    address: {
        type: String,
        required: true,
    },
    openingDate: {
        type: Timestamp,
    },
    softOpeningDate: {
        type: Timestamp,
    },
    isOpenSoon: {
        type: Boolean,
    },
    PostImage: {
        type: imageSchema,
    },
    PostDesc: {
        type: String,
    },
    PostExpireDate: {
        type: Timestamp,
    },
    placeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",
        required: true,
    },
    workingHours:{
        Sunday:[ workingHoursSchema ],
        Monday:[ workingHoursSchema ],
        Tuesday:[ workingHoursSchema ],
        Wednesday:[ workingHoursSchema ],
        Thursday:[ workingHoursSchema ],
        Friday:[ workingHoursSchema ],
        Saturday:[ workingHoursSchema ],
    }

});

module.exports = branchSchema;