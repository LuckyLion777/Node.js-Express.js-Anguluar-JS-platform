const models = require("../models");
const protectedRouter = require("express").Router();
const router = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const upload = require("multer")({ dest: "uploads/event" });


protectedRouter.post("/event", mustbe.authorized("Create Event"), upload.single("cover"), (req, res, next) => {
    if(req.file) req.body.cover = { path: req.file.path };

    res.locals.promise = models.Event.createEvent(req.body);
    return next();
});

protectedRouter.put("/event/:eventId", mustbe.authorized("Update Event"), (req, res, next) => {
    if(req.file) req.body.cover = { path: req.file.path };

    res.locals.promise = req.params.event.updateEvent(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId", mustbe.authorized("Remove Event"), (req, res, next) => {
    res.locals.promise = req.params.event.removeEvent();
    return next();
});

router.get("/event/:eventId", (req, res, next) => res.send(req.params.event));

router.get("/events/", (req, res, next) => {
    res.locals.promise = models.Event.getEvents();
    return next();
});


protectedRouter.post("/event/:eventId/option", mustbe.authorized("Add Event Option"), (req, res, next) => {
    res.locals.promise = req.params.event.addOption(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId/option/:optionId", mustbe.authorized("Delete Event Option"), (req, res, next) => {
    res.locals.promise = req.params.event.removeOption(req.params.optionId);
    return next();
});


protectedRouter.post("/event/:eventId/socialMedia", mustbe.authorized("Add Event Social Media"), (req, res, next) => {
    res.locals.promise = req.params.event.addSocialMedia(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId/socialMediasId/:socialMediasId", mustbe.authorized("Remove Event Social Media"), (req, res, next) => {
    res.locals.promise = req.params.event.removeSocialMedia(req.params.socialMediaId);
    return next();
});


protectedRouter.post("/event/:eventId/attendant", mustbe.authorized("Add Event Attendant"), (req, res, next) => {
    res.locals.promise = req.params.event.addAttendant(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId/attendant/:attendantId", mustbe.authorized("Remove Event Attendant"), (req, res, next) => {
    res.locals.promise = req.params.event.removeAttendant(req.params.attendantId);
    return next();
});


protectedRouter.post("/event/:eventId/rating", mustbe.authorized("Add Event Rating"), (req, res, next) => {
    res.locals.promise = req.params.event.addRating(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId/rating/:ratingId", mustbe.authorized("Remove Event Rating"), (req, res, next) => {
    res.locals.promise = req.params.event.removeRating(req.params.ratingId);
    return next();
});


protectedRouter.post("/event/:eventId/tag", mustbe.authorized("Add Tag"), (req, res, next) => {
    res.locals.promise = req.params.event.addTag(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId/tag/:tag", mustbe.authorized("Remove Tag"), (req, res, next) => {
    res.locals.promise = req.params.event.removeTag(req.params.tag);
    return next();
});


protectedRouter.post("/event/:eventId/comment", mustbe.authorized("Add Comment"), (req, res, next) => {
    res.locals.promise = req.params.event.addComment(req.body);
    return next();
});

protectedRouter.delete("/event/:eventId/comment/:commentId", mustbe.authorized("Remove Comment"), (req, res, next) => {
    res.locals.promise = req.params.event.removeComment(req.params.commentId);
    return next();
});

//TODO: set limit of uploads
//TODO: check if you need simple check for req.files instead of try-catch
protectedRouter.post("/event/:eventId/photo", mustbe.authorized("Add Photo"), upload.array("photo"), (req, res, next) => {
    try {
        res.locals.promise = req.params.event.addPhoto(req.files.map(photo => ({ path: photo.path })));
        return next();
    } catch(err) {
        return next(new Error("You Should Use Form-Data Encoding Only With This End Point"))
    }
});

protectedRouter.delete("/event/:eventId/photo/:photoId", mustbe.authorized("Remove Photo"), (req, res, next) => {
    res.locals.promise = req.params.event.removePhoto(req.params.photoId);
    return next();
});


protectedRouter.post("/event/:eventId/category", mustbe.authorized("Add Category"), (req, res, next) => {
    res.locals.promise = req.params.event.addCategory(req.body.category);
    return next();
});

protectedRouter.delete("/event/:eventId/category/:categoryId", mustbe.authorized("Remove Category"), (req, res, next) => {
    res.locals.promise = req.params.event.removeCategory(req.params.categoryId);
    return next();
});



const findEvent = (req, res, next, eventId) => {
    models.Event.findById(eventId)
        .then(event => {
            if(!event) {
                return next(new Error("Event Does Not Exist"));
            } else {
                req.params.event = event;
                return next();
            }
        }, err => next(err) )
};

router.param("eventId", findEvent);
protectedRouter.param("eventId", findEvent);

module.exports = {
    router: router,
    protectedRouter: protectedRouter
};