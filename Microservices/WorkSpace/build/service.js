"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _expressRateLimit = require("express-rate-limit");

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

var _config = require("config");

var _config2 = _interopRequireDefault(_config);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _WSRoutes = require("./api/WSRoutes");

var _WSRoutes2 = _interopRequireDefault(_WSRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load configurations
var port = _config2.default.get("app.port");
var db = _config2.default.get("database.url");
var prefix = _config2.default.get("api.prefix");
var app = (0, _express2.default)();
var corsOptions = {
    origin: _config2.default.get("client.url"),
    credentials: true
};

// Using helmet to increase security
app.use((0, _helmet2.default)());

// Enable cors
app.use((0, _cors2.default)(corsOptions));

// Enable cookie parser
app.use((0, _cookieParser2.default)());

// Middleware to add header to response of the any request
/*app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
    next();
});*/

// Using Limiter to prevent attacks
new _expressRateLimit2.default({
    windowMs: 15 * 60 * 1000, // 15 min is the time of our cycle
    max: 100, // Max number of requests
    dealyMs: 0 // Disable dalay bentween each request
    // This mean each ip will be able to make only 100 request in each 15 min and there is no dealy between requests
});

// Express Parser setup
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());

// Setup mongoose connection
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Calling service routes
app.use(prefix, _WSRoutes2.default);

// Running server
var listen = app.listen(port, function () {
    console.log("Server is running on port " + port);
});

// Export port
module.exports = app;
// module.exports.port=listen.address().port;