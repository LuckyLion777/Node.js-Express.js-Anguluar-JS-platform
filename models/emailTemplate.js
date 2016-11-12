const mongoose = require("mongoose");
const validator = require("validator");
const Language = require("./language").Language;

const TYPE = {
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    RESET: "RESET",
    FORGET: "FORGET",
    ADDCONTENT: "ADDCONTENT",
    MODIFYCONTENT: "MODIFYCONTENT",
    DELETECONTENT: "DELETECONTENT",
    APPROVECONTENT: "APPROVECONTENT"
};

const emailTemplateSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [ TYPE.REGISTER, TYPE.LOGIN, TYPE.RESET, TYPE.FORGET, TYPE.ADDCONTENT, TYPE.MODIFYCONTENT, TYPE.DELETECONTENT, TYPE.APPROVECONTENT ],
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
    template: {
        type: String,
        required: true
    }
});

module.exports = emailTemplateSchema;