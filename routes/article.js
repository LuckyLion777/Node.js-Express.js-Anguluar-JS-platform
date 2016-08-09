const models = require("../models");
const router = require("express").Router();
const auth = require("../util/auth/index");
const passport = require("passport");
const upload = require("multer")({ dest: "uploads/article" });


router.post("/", passport.authenticate("jwt", { session: false }),
    auth.can("Create Article"), upload.single("cover"), (req, res, next) => {
    req.body.user = req.user;
    if(req.file) req.body.cover = { path: req.file.path };

    res.locals.promise = models.Article.createArticle(req.body);
    return next();
});

router.put("/:articleId", passport.authenticate("jwt", { session: false }),
    auth.can("Update Article"), upload.single("cover"), (req, res, next) => {
    if(req.file) req.body.cover = { path: req.file.path };

    res.locals.promise = req.params.article.updateArticle(req.body);
    return next();
});

router.delete("/:articleId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article"), (req, res, next) => {
    res.locals.promise = req.params.article.removeArticle();
    return next();
});

router.get("/:articleId", (req, res, next) => res.send(req.params.article));

router.get("/", (req, res, next) => {
    res.locals.promise = models.Article.getArticles();
    return next();
});


router.post("/:articleId/comment", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Comment"), (req, res, next) => {
    req.body.user = req.user;

    res.locals.promise = req.params.article.addComment(req.body);
    return next()
});

router.delete("/:articleId/comment/:commentId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Comment"), (req, res, next) => {
    res.locals.promise = req.params.article.removeComment(req.params.commentId);
    return next();
});

//TODO: set a limit for the number of uploads
router.post("/:articleId/photo", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Photo"), upload.array("photo"), (req, res, next) => {
    try{
        res.locals.promise = req.params.article.addPhoto(req.files.map(photo => ({ path: photo.path }) ));
        return next();
    } catch(err) {
        return next(new Error("You Should Use Form-Data Encoding Only With This End Point"))
    }
});

router.delete("/:articleId/photo/:photoId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Photo"), (req, res, next) => {
    res.locals.promise = req.params.article.removePhoto(req.params.photoId);
    return next();
});


router.post("/:articleId/tag", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Tag"), (req, res, next) => {
    res.locals.promise = req.params.article.addTag(req.body);
    return next();
});

router.delete("/:articleId/tag/:tag", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Tag"), (req, res, next) => {
    res.locals.promise = req.params.article.removeTag(req.params.tag);
    return next();
});


router.post("/:articleId/like", passport.authenticate("jwt", { session: false }),
    auth.can("Like Article"), (req, res, next) => {
    res.locals.promise = req.params.article.like(req.user);
    return next();
});

router.delete("/:articleId/like", passport.authenticate("jwt", { session: false }),
    auth.can("Unlike Article"), (req, res, next) => {
    res.locals.promise = req.params.article.unlike(req.user);
    return next();
});


router.post("/:articleId/publish", passport.authenticate("jwt", { session: false }),
    auth.can("Publish Article"), (req, res, next) => {
    res.locals.promise = req.params.article.publish();
    return next();
});


router.post("/:articleId/approve", passport.authenticate("jwt", { session: false }),
    auth.can("Approve Article"), (req, res, next) => {
    res.locals.promise = req.params.article.approve();
    return next();
});

router.post("/:articleId/hold", passport.authenticate("jwt", { session: false }),
    auth.can("Hold Article"), (req, res, next) => {
    res.locals.promise = req.params.article.hold();
    return next();
});

router.post("/:articleId/suspend", passport.authenticate("jwt", { session: false }),
    auth.can("Suspend Article"), (req, res, next) => {
    res.locals.promise = req.params.article.suspend();
    return next();
});

router.post("/:articleId/provoke", passport.authenticate("jwt", { session: false }),
    auth.can("Provoke Article"), (req, res, next) => {
    res.locals.promise = req.params.article.provoke();
    return next();
});


router.post("/:articleId/collection", passport.authenticate("jwt", { session: false }),
    auth.can("Add Article Collection"), (req, res, next) => {
    res.locals.promise = req.params.article.addCollection(req.body.collection);
    return next();
});

router.delete("/:articleId/collection/:collectionId", passport.authenticate("jwt", { session: false }),
    auth.can("Remove Article Collection"), (req, res, next) => {
    res.locals.promise = req.params.article.removeCollection(req.params.collectionId);
    return next();
});


router.param("articleId", (req, res, next, articleId) => {
    models.Article.findById(articleId)
        .then(article => {
            if(!article) {
                return next(new Error("Article Does Not Exist"))
            } else {
                req.params.article = article;
                return next();
            }
        }, err => next(err) );
});


module.exports = router;