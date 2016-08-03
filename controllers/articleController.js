const models = require("../models");
const router = require("express").Router();
const protectedRouter = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const upload = require("multer")({ dest: "uploads/article" });


protectedRouter.post("/article", mustbe.authorized("Create Article"), upload.single("cover"), (req, res, next) => {
    req.body.user = req.user;
    if(req.file) req.body.cover = { path: req.file.path };

    res.locals.promise = models.Article.createArticle(req.body);
    return next();
});

protectedRouter.put("/article/:articleId", upload.single("cover"), mustbe.authorized("Update Article"), (req, res, next) => {
    if(req.file) req.body.cover = { path: req.file.path };

    res.locals.promise = req.params.article.updateArticle(req.body);
    return next();
});

protectedRouter.delete("/article/:articleId", mustbe.authorized("Remove Article"), (req, res, next) => {
    res.locals.promise = req.params.article.removeArticle();
    return next();
});

router.get("/article/:articleId", (req, res, next) => res.send(req.params.article));

router.get("/articles", (req, res, next) => {
    res.locals.promise = models.Article.getArticles();
    return next();
});


protectedRouter.post("/article/:articleId/comment", mustbe.authorized("Add Comment"), (req, res, next) => {
    req.body.user = req.user;

    res.locals.promise = req.params.article.addComment(req.body);
    return next()
});

protectedRouter.delete("/article/:articleId/comment/:commentId", mustbe.authorized("Remove Comment"), (req, res, next) => {
    res.locals.promise = req.params.article.removeComment(req.params.commentId);
    return next();
});

//TODO: set a limit for the number of uploads
protectedRouter.post("/article/:articleId/photo", upload.array("photo"), mustbe.authorized("Add Photo"), (req, res, next) => {
    try{
        res.locals.promise = req.params.article.addPhoto(req.files.map(photo => ({ path: photo.path }) ));
        return next();
    } catch(err) {
        return next(new Error("You Should Use Form-Data Encoding Only With This End Point"))
    }
});

protectedRouter.delete("/article/:articleId/photo/:photoId", mustbe.authorized("Remove Photo"), (req, res, next) => {
    res.locals.promise = req.params.article.removePhoto(req.params.photoId);
    return next();
});


protectedRouter.post("/article/:articleId/tag", mustbe.authorized("Add Tag"), (req, res, next) => {
    res.locals.promise = req.params.article.addTag(req.body);
    return next();
});

protectedRouter.delete("/article/:articleId/tag/:tag", mustbe.authorized("Remove Tag"), (req, res, next) => {
    res.locals.promise = req.params.article.removeTag(req.params.tag);
    return next();
});


protectedRouter.post("/article/:articleId/like", mustbe.authorized("Like"), (req, res, next) => {
    res.locals.promise = req.params.article.like(req.user);
    return next();
});

protectedRouter.delete("/article/:articleId/like", mustbe.authorized("Unlike"), (req, res, next) => {
    res.locals.promise = req.params.article.unlike(req.user);
    return next();
});


protectedRouter.post("/article/:articleId/publish", mustbe.authorized("Publish"), (req, res, next) => {
    res.locals.promise = req.params.article.publish();
    return next();
});


protectedRouter.post("/article/:articleId/approve", mustbe.authorized("Approve"), (req, res, next) => {
    res.locals.promise = req.params.article.approve();
    return next();
});

protectedRouter.post("/article/:articleId/hold", mustbe.authorized("Hold"), (req, res, next) => {
    res.locals.promise = req.params.article.hold();
    return next();
});

protectedRouter.post("/article/:articleId/suspend", mustbe.authorized("Suspend"), (req, res, next) => {
    res.locals.promise = req.params.article.suspend();
    return next();
});

protectedRouter.post("/article/:articleId/provoke", mustbe.authorized("Provoke"), (req, res, next) => {
    res.locals.promise = req.params.article.provoke();
    return next();
});


const findArticle = (req, res, next, articleId) => {
    models.Article.findById(articleId)
        .then(article => {
            if(!article) {
                return next(new Error("Article Does Not Exist"))
            } else {
                req.params.article = article;
                return next();
            }
        }, err => next(err) );
};

protectedRouter.param("articleId", findArticle);

router.param("articleId", findArticle);


module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
