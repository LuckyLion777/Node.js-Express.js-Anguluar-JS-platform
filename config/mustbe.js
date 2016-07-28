const models = require("../models/");
const mustbe = require("mustbe");
const passport = require("passport");


module.exports = function (config) {

    config.userIdentity(function (id) {
        id.isAuthenticated(function (user, done) {
            done(null, user);
        })
    });

    config.routeHelpers(function (rh) {

        rh.getUser(function (req, callback) {
            callback(null, req.user);
        });

        rh.notAuthorized(function (req, res, next) {
            return next(new Error("You Are Not Authorized"));
        });

        rh.notAuthenticated(function (req, res, next) {
            return next(new Error("You Are Not Logged In"));
        });

        rh.parameterMaps(function (params) {
            params.map("Access User", function (req) {
                return {
                    user: req.user,
                }
            });
        });

    });

    config.activities(function (activities) {

        activities.can("Create Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Get Article", function (identity, params, done) {
            return done(null, true);
        });

    });
};