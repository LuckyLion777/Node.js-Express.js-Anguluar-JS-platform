const STATUS = {
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED"
};


const featuredSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is fired
few times. Why?

    date: {
        type: Timestamp,
    },
    expireDate: {
        type: Timestamp,
    },
    price: {
        type: Double,
    },
    Status: {
        type: String,
        enum: [ STATUS.ACTIVE, STATUS.BLOCKED ],
        default: STATUS.ACTIVE
    },
    placeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",
        required: true,
    },
    addOnID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addOn",
        required: true,
    },

});