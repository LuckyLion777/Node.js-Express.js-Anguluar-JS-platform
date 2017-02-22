const STATUS = {
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED"
};

const planSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is fired
few times. Why?

    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    period: {
        type: Integer,
    },
    price: {
        type: Double,
    },
    startDate: {
        type: Timestamp,
    },
    expireDate: {
        type: Timestamp,
    },
    Status: {
        type: String,
        enum: [ STATUS.ACTIVE, STATUS.BLOCKED ],
        default: STATUS.ACTIVE
    },

});