const models          = require("../models/");
const passport        = require("passport");
const LocalStrategy   = require("passport-local");
const bcrypt          = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, function(email, password, done) {
    models.User.findOne({ email: email }).then(function (user) {
        if (!user) {
            return done(null, false);
        } else {
            bcrypt.compare(password, user.password, function(err, res) {
                if (err) { return done(err); }
                if(res) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    }, function (err) {
        return done(err);
    });
}));

module.exports = passport;