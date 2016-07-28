const models = require("../models");
const router = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");
const protectedRouter = require("express").Router();
protectedRouter.use(passport.authenticate("jwt", { session: false}));


protectedRouter.post("/article", mustbe.authorized("Create Article"), (req, res, next) => {
    req.body.user = req.user;

    models.Article.createArticle(req.body)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

protectedRouter.put("/article/:articleId", mustbe.authorized("Update Article"), (req, res, next) => {
    req.params.article.updateArticle(req.body)
        .then(result => {
            return res.send(result);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/article/:articleId", mustbe.authorized("Remove Article"), (req, res, next) => {
    req.params.article.removeArticle()
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

//TODO: implement list article

router.get("/article/:articleId", mustbe.authorized("Get Article"), (req, res, next) => {
    return res.send(req.params.article);
});

router.param("articleId", (req, res, next, articleId) => {
    models.Article.findById(articleId)
        .then(article => {
            if(!article) {
                return next(new Error("Article Does Not Exist"))
            } else {
                return req.params.article = article;
            }
        }, err => {
            return next(err)
        })
});


module.exports.protectedRouter = protectedRouter;
module.exports.router = router;