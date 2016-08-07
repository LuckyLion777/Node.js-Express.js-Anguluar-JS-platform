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

        activities.allow((identity, activity, done) => new Permission(identity, null, done)
            .isAdmin()
            .done());


        /***************************************START OF Article SECTION***********************************************/


        activities.can("Create Article", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Update Article", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());

        activities.can("Remove Article", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());


        activities.can("Add Article Photo", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());

        activities.can("Remove Article Photo", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());


        activities.can("Add Article Tag", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());

        activities.can("Remove Article Tag", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());


        activities.can("Like Article", (...arguments) => new Permission(...arguments)
            .isActive()
            .not()
            .isArticleOwner()
            .done());

        activities.can("Unlike Article", (...arguments) => new Permission(...arguments)
            .isActive()
            .not()
            .isArticleOwner()
            .done());

        activities.can("Add Article Comment", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Article Comment", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());


        activities.can("Publish Article", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());


        activities.can("Approve Article", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Hold Article", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Suspend Article", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Provoke Article", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        activities.can("Add Article Collection", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());

        activities.can("Remove Article Collection", (...arguments) => new Permission(...arguments)
            .isActive()
            .isArticleOwner()
            .done());


        /************************************END OF ARTICLE SECTION****************************************************/


        activities.can("Create Business", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .done());

        activities.can("Update Business", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Delete Business", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Social Media", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Remove Business Social Media", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Photo", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Delete Business Photo", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Tag", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Delete Business Tag", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Branch", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Delete Business Branch", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Category", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Remove Business Category", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Option", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Delete Business Option", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        activities.can("Add Business Review", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Business Review", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Comment Business Review", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Comment On Business Review", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());


        activities.can("Add Business Rating", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Business Rating", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());


        activities.can("Add Business Collection", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());

        activities.can("Remove Business Collection", (...arguments) => new Permission(...arguments)
            .isActive()
            .isBusinessUser()
            .isBusinessOwner()
            .done());


        /************************************END OF BUSINESS SECTION***************************************************/


        activities.can("Create Location", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Update Location", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Delete Location", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        /************************************END OF Location SECTION***************************************************/


        activities.can("Create Language", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Update Language", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Language", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        /************************************END OF Language SECTION***************************************************/


        activities.can("Create Category", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        /************************************END OF Category SECTION***************************************************/


        activities.can("Create Collection", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Update Collection", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Collection", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        /************************************END OF Collection SECTION***************************************************/


        activities.can("Create Event", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Update Event", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Event", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        activities.can("Add Event Option", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Delete Event Option", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        activities.can("Add Event Social Media", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Event Social Media", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        activities.can("Add Event Attendant", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Event Attendant", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());


        activities.can("Add Event Rating", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Event Rating", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());


        activities.can("Add Event Tag", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Event Tag", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        activities.can("Add Event Comment", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());

        activities.can("Remove Comment", (...arguments) => new Permission(...arguments)
            .isActive()
            .done());


        activities.can("Add Event Photo", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Event Photo", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        activities.can("Add Event Category", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

        activities.can("Remove Event Category", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());


        /************************************END OF Event SECTION***************************************************/


        activities.can("List Users", (...arguments) => new Permission(...arguments)
            .isAdmin()
            .done());

    });
};


const Permission  = function(identity, params, callback, result = false) {
    this.identity = identity;
    this.params = params;
    this.callback = callback;
    this.result = result;

    this.not = false;
};


Permission.prototype.isAdmin = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.user.__t == "Admin") : false;
    return this;
};

Permission.prototype.isAuthenticated = function () {
    this.result = this.identity.user;
    return this;
};

Permission.prototype.isActive = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.user.status == "ACTIVE") : false;
    return this;
};

Permission.prototype.isArticleOwner = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.req.article.user == this.identity.req.user) : false;
    return this;
};

Permission.prototype.isBusinessUser = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.user.__t == "BusinessUser") : false;
    return this;
};

Permission.prototype.isBusinessOwner = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.req.business.user == this.identity.user) : false;
    return this;
};

Permission.prototype.isReviewOwner = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.req.business.user == this.identity.user) : false;
    return this;
};

Permission.prototype.isCommentOwner = function () {
    this.result =
        this.isAuthenticated() ? this.result && (this.identity.req.business.user == this.identity.user) : false;
    return this;
};

Permission.prototype.done = function () {
    this.callback(null, this.result);
};