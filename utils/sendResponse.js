const js2xmlparser = require("js2xmlparser");

exports.sendJsonResponse = (req, res, statusCode, data, message) => {
    return res.status(statusCode).json({
        message : message == null? undefined: message,
        data,
    });
};
exports.sendXmlResponse = (req, res, statusCode, data) => {
    res.setHeader('content-type', 'application/xml');
    return res.status(statusCode).send(js2xmlparser.parse("data", data));
};

exports.sendResponse = (req, res, statusCode, data, message) => {
    if (req.headers.accept == 'application/xml')
        this.sendXmlResponse(req, res, statusCode, data)
    else
        this.sendJsonResponse(req, res, statusCode, data, message)
}