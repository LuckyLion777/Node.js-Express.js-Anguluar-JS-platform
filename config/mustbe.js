const models = require("../models/");
const mustbe = require("mustbe");


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


        activities.allow( (identity, params, done) => {
            done(null, identity.user.__t == "Admin");
        });


        activities.can("Create Article", (identity, params, done) => true );

        activities.can("Update Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Article Photo", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article Photo", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Article Tag", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article Tag", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Like Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Unlike Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Add Article Comment", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article Comment", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Publish Article", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Approve Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Hold Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Suspend Article", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Provoke Article", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Article Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Article Collection", function (identity, params, done) {
            return done(null, true);
        });


        /************************************END OF ARTICLE SECTION****************************************************/


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


        activities.can("Add Business Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Business Collection", function (identity, params, done) {
            return done(null, true);
        });


        /************************************END OF BUSINESS SECTION***************************************************/


        activities.can("Create Location", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Location", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Delete Location", function (identity, params, done) {
            return done(null, true);
        });


        /************************************END OF Location SECTION***************************************************/


        activities.can("Create Language", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Language", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Language", function (identity, params, done) {
            return done(null, true);
        });


        /************************************END OF Language SECTION***************************************************/


        activities.can("Create Category", function (identity, params, done) {
            return done(null, true);
        });


        /************************************END OF Category SECTION***************************************************/


        activities.can("Create Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Collection", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Collection", function (identity, params, done) {
            return done(null, true);
        });


        /************************************END OF Collection SECTION***************************************************/


        activities.can("Create Event", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Update Event", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event", function (identity, params, done) {
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


        activities.can("Add Event Tag", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event Tag", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Comment", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Comment", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Photo", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event Photo", function (identity, params, done) {
            return done(null, true);
        });


        activities.can("Add Event Category", function (identity, params, done) {
            return done(null, true);
        });

        activities.can("Remove Event Category", function (identity, params, done) {
            return done(null, true);
        });


    });
};