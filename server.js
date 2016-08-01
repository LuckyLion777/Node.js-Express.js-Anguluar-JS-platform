const express = require("express");
const server = express();
const passport = require("./config/passport");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(require("./config/database"));
mongoose.Promise = require("bluebird");
const logger = require("morgan");
const feedbackHandler = require("./util/feedbackHandler");
var mustBe = require("mustbe");
var mustBeConfig = require("./config/mustbe");
mustBe.configure(mustBeConfig);

server.use(express.static(path.join(__dirname, "./public")));



server.use(logger("dev", {
    skip: () => {
        return process.env.NODE_ENV == "test"
    }
}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(cors());

server.use("/api", require("./controllers/userController"));
server.use("/api", require("./controllers/businessUserController").router);
server.use("/api", require("./controllers/businessController").router);
server.use("/api", require("./controllers/articleController").router);

server.use("/api", passport.authenticate("jwt", { session: false}));

server.use("/api", require("./controllers/articleController").protectedRouter);
server.use("/api", require("./controllers/businessController").protectedRouter);
server.use("/api", require("./controllers/categoryController").protectedRouter);
server.use("/api", require("./controllers/languageController").protectedRouter);


server.use(feedbackHandler.failureHandler);


const port = 3000;
server.listen(port, () => {
    console.log("Listening on port", port);
});
