const models          = require("../models/");
const passport        = require("passport");
const LocalStrategy   = require("passport-local");
const bcrypt          = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    models.User.findOne({ email: email }).then( (user) => {
        if (!user) {
            return done(null, false);
        } else {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) { return done(err); }
                if(res) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    }, (err) => {
        return done(err);
    });
}));

module.exports = passport;