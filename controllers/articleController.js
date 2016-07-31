const models = require("../models");
const router = require("express").Router();
const protectedRouter = require("express").Router();
const mustbe = require("mustbe").routeHelpers();
const passport = require("passport");


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

router.get("/article/:articleId", (req, res, next) => {
    return res.send(req.params.article);
});

router.get("/articles", (req, res, next) => {
    models.Article.getArticles()
        .then(articles => {
            return res.send(articles);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/article/:articleId/comment", mustbe.authorized("Add Comment"), (req, res, next) => {
    req.body.user = req.user;

    req.params.article.addComment(req.body)
        .then(comment => {
            return res.send(comment);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/article/:articleId/comment/:commentId", mustbe.authorized("Remove Comment"), (req, res, next) => {
    req.params.article.removeComment(req.params.commentId)
        .then(comment => {
            return res.send(comment);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/article/:articleId/photo", mustbe.authorized("Add Photo"), (req, res, next) => {
    req.params.article.addPhoto(req.body)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/article/:articleId/photo/:photoId", mustbe.authorized("Remove Photo"), (req, res, next) => {
    req.params.article.removePhoto(req.params.photoId)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/article/:articleId/tag", mustbe.authorized("Add Tag"), (req, res, next) => {
    req.params.article.addTag(req.body)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/article/:articleId/tag/:tag", mustbe.authorized("Remove Tag"), (req, res, next) => {
    req.params.article.removeTag(req.params.tag)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/article/:articleId/like", mustbe.authorized("Like"), (req, res, next) => {
    req.params.article.like(req.user)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

protectedRouter.delete("/article/:articleId/like", mustbe.authorized("Unlike"), (req, res, next) => {
    req.params.article.unlike(req.user)
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/article/:articleId/publish", mustbe.authorized("Publish"), (req, res, next) => {
    req.params.article.publish()
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});


protectedRouter.post("/article/:articleId/approve", mustbe.authorized("Approve"), (req, res, next) => {
   req.params.article.approve()
       .then(article => {
           return res.send(article);
       }, err => {
           return next(err);
       })
});

protectedRouter.post("/article/:articleId/hold", mustbe.authorized("Hold"), (req, res, next) => {
    req.params.article.hold()
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

protectedRouter.post("/article/:articleId/suspend", mustbe.authorized("Suspend"), (req, res, next) => {
    req.params.article.suspend()
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
});

protectedRouter.post("/article/:articleId/provoke", mustbe.authorized("Provoke"), (req, res, next) => {
    req.params.article.provoke()
        .then(article => {
            return res.send(article);
        }, err => {
            return next(err);
        })
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
        }, err => {
            return next(err)
        })
};

protectedRouter.param("articleId", findArticle);

router.param("articleId", findArticle);


module.exports = {
    protectedRouter: protectedRouter,
    router: router
};
