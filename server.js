const express = require("express");
const server = express();
const passport = require("./config/passport");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(require("./config/database"));
const logger = require("morgan");
const feedbackHandler = require("./util/feedbackHandler");

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
server.use("/api", require("./controllers/businessUserController"));

server.use(feedbackHandler.failureHandler);


const port = 3000;
server.listen(port, () => {
    console.log("Listening on port", port);
});
