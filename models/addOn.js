const TYPE = {
    FEATURED: "Featured",
    OFFER: "Offer"
};

const addOnSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is fired few times. Why?

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
    endDate: {
        type: Timestamp,
    },
    type: String,
    enum: [ TYPE.FEATURED, TYPE.OFFER ],
    required: true,

});