const mongoose = require("mongoose");
const AbstractUser = require("./abstractUser").AbstractUser;
const Language = require("./language").Language;

const STATUS = {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED"
};

const businessUserSchema = AbstractUser.discriminator("BusinessUser", new mongoose.Schema({
    //TODO: set range
    subscription: {
        type: String,
        required: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true,
        validate: {
            validator: (languageId, done) => {
                Language.count({ _id: languageId})
                    .then(count => {
                        return done(count);
                    }, err => {
                        //TODO: log
                        return done(false, err);
                    })
            },
            message: "Language Does Not Exist"
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        validate: {
            validator: (locationId, done) => {
                Location.count({ _id: locationId })
                //TODO: Log
                    .then(count => done(count), err => done(false, err) )
            }
        }
    },
    biography: String,
    phone: Number,
    status: {
        type: String,
        enum: [ STATUS.ACTIVE, STATUS.PENDING, STATUS.BLOCKED ],
        default: STATUS.PENDING
    }
}));


module.exports = {
    businessUserSchema: businessUserSchema,
    BusinessUser: mongoose.model("BusinessUser", businessUserSchema)
};