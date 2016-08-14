const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, callback) => callback(null, crypto.pseudoRandomBytes(10).toString("hex") + file.originalname)
});


module.exports = multer({ storage: diskStorage });