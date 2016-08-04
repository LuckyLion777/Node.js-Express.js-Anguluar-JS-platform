const router = require("express").Router();
const protectedRouter = require("express").Router();
const passport = require("passport");


router.use(require("./userController"));
router.use(require("./articleController").router);
router.use(require("./businessController").router);
router.use(require("./locationController").router);
router.use(require("./languageController").router);
router.use(require("./businessUserController").router);
router.use(require("./eventController").router);
router.use(require("./collectionController").router);
router.use(require("./adminController"));


protectedRouter.use(require("./articleController").protectedRouter);
protectedRouter.use(require("./businessController").protectedRouter);
protectedRouter.use(require("./locationController").protectedRouter);
protectedRouter.use(require("./languageController").protectedRouter);
protectedRouter.use(require("./categoryController").protectedRouter);
protectedRouter.use(require("./eventController").protectedRouter);
protectedRouter.use(require("./collectionController").protectedRouter);

//TODO: graph this and make sure it does not leak requests
module.exports = [
    router,
    require("../util/resultHandler"),
    passport.authenticate("jwt", { session: false }),
    protectedRouter,
    require("../util/resultHandler")
];