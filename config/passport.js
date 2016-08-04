const models = require("../models/");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    models.AbstractUser.findOne({ email: email }).then( (user) => {
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

passport.use(new JwtStrategy({
        secretOrKey: process.env.SERVER_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    },
    (credentials, done) => {
        models.AbstractUser.findById(credentials.userId)
            .then( user => {
                if(!user) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            }, err => {
                return done(err);
            })
    }));

module.exports = passport;