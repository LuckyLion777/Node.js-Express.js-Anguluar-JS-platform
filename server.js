const express = require("express");
const server = express();
const passport = require("./config/passport");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(require("./config/database"));
mongoose.Promise = require("bluebird");
const logger = require("morgan");


server.use(express.static(path.join(__dirname, "./public")));


server.use(logger("dev", {
    skip: () => {
        return process.env.NODE_ENV == "test"
    }
}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(require("cors")());
server.use("/api", require("./routes"));
server.use("/api", require("./util/resultHandler"));


const port = 3000;
server.listen(port, () => {
    console.log("Listening on port", port);
});
