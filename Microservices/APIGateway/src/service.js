const express = require("express");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/authRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');

// load configurations
const port = config.get("app.port");
const prefix = config.get("api.prefix");
const app  =  express();
const corsOptions = {
    origin: config.get("client.url"),
    credentials: true
}

// Using helmet to increase security
app.use(helmet());

// Enable cors
app.use(cors(corsOptions));

// Enable cookie parser
app.use(cookieParser())

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

// Calling service routes
app.use(prefix, authRoutes);
app.use(prefix, workspaceRoutes);

// Running server
app.listen(port, () => console.log(`Server is running on port ${port}`));