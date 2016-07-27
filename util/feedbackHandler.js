
module.exports.successHandler = (req, res, next) => {
    return res.send(res.result);
};

module.exports.failureHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    } else {
        return res.status(400).send(err.toString());
    }
};