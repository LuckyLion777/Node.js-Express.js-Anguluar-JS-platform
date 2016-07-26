var express = require("express");
var server = express();
var passport = require("./config/passport");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
mongoose.connect(require("./config/database"));
var logger = require("morgan");

server.use(express.static(path.join(__dirname, "./public")));

server.use(logger("dev", {
    skip: function () {
        return process.env.NODE_ENV == "test"
    }
}));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());

server.use("/api", require("./controllers/userController"));


var port = 3000;
server.listen(port, () => {
    console.log("Listening on port", port);
});
