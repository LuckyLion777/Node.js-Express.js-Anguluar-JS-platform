const models = require("../models/");
const mustbe = require("mustbe");
const passport = require("passport");


module.exports = function (config) {

    config.userIdentity(id => {
        id.isAuthenticated((user, done) => done(null, user))
    });

    config.routeHelpers(function (rh) {

        rh.getUser((req, callback) => callback(null, req.user));

        rh.notAuthorized((req, res, next) => next(new Error("You Are Not Authorized")));

        rh.notAuthenticated((req, res, next) => next(new Error("You Are Not Logged In")));

        rh.parameterMaps(function (params) {
            params.map("Access AbstractUser", (req) => ({ user: req.user }));
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


        activities.can("Add Business Social Media", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Business Social Media", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Photo", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Business Photo", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Tag", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Business Tag", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Branch", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Business Branch", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Category", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Business Category", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Option", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Business Option", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Review", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Business Review", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Comment Business Review", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Comment On Business Review", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Rating", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Business Rating", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Create Location", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Location", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Location", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Create Language", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Language", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Language", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Create Event", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Event", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Create Category", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Create Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Collection", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Option", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Event Option", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Social Media", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event Social Media", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Attendant", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event Attendant", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Rating", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event Rating", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Tag", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Tag", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Comment", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Comment", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Photo", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Photo", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Category", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Category", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Business Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Business Collection", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Article Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article Collection", function (identity, params, done) {
            return done(null, true);
        });


    });
};