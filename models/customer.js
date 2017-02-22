const STATUS = {
    ACTIVE: "ACTIVE",
//    HOLD: "HOLD",
    BLOCKED: "BLOCKED"
};

const customerSchema = new mongoose.Schema({

    //validators & field scheme will be added later
    //TODO: why it is needed to describe it after module.export?
    //TODO: when adding a single tag, for example - validator is fired few times. Why?

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                return validator.isEmail(email);
            }
        }
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [ STATUS.ACTIVE, STATUS.BLOCKED ],
        /!*default: STATUS.HOLD*!/
        default: STATUS.ACTIVE
    },
    joiningDate: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatar: imageSchema,

});