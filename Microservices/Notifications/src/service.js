import express from "express";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import config from "config";
import Socket from "socket.io";

// loading Routes
import notificationRoutes from "./api/notificationRoutes";

// load configurations
const port = config.get("app.port");
const prefix = config.get("api.prefix");
const app  =  express();
const server = require('http').Server(app);
const io = Socket(server);


// Using helmet to increase security
app.use(helmet());

// Middleware to add header to response of the any request
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
    next();
});

// Using Limiter to prevent attacks
new RateLimit({
    windowMs: 15*60*1000,       // 15 min is the time of our cycle
    max: 100,                   // Max number of requests
    delayMs: 0                  // Disable delay between each request
    // This mean each ip will be able to make only 100 request in each 15 min and there is no delay between requests
});

// Express Parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Adjusting notifications sockets
io.on('connect', (socket) => {
    console.log('done');
    socket.emit('notifying');
});

// Running server
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Export port
module.exports= app;