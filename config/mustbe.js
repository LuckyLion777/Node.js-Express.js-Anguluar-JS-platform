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


        activities.can("Add Photo", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Photo", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Tag", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Tag", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Like", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Unlike", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Admin", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Comment", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Comment", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Publish", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Approve", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Hold", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Suspend", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Provoke", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Create Business", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Business", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Business", function (identity, params, done) {
            return done(null, true);
        });


    });
};