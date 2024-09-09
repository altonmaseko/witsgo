const path = require("path")
const express = require("express")
const session = require("express-session")
const cors = require('cors');
const mongoose = require("mongoose")
const connectDB = require("./config/connectDB")
const passport = require("passport")
const cookieParser = require('cookie-parser');
const cors = require("cors")
require("dotenv").config()
require("./auth");
const app = express()

// ROUTES ==========================================
const googleAuthRouter = require("./routers/googleAuthRouter");
// END: ROUTES =====================================

// SETUP MIDDLEWARE [not our own] =================== 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://127.0.0.1:5501",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// END: MIDDLEWARE ================================

const route_optimize = require("./routers/v1/route_optimize/route_optimize")
app.use("/v1/route_optimize", route_optimize);

app.get("/", (req, res) => {
    res.send("Welcome to the WITSGO server, what are you doing here bruv?? Go to the frontend!");
});

app.use(googleAuthRouter);

// Server-only Interactions ==========================
const isLoggedIn = (req, res, next) => {
    // req.user is set by passport if the user is successfully authenticated by googles
    req.user ? next() : res.sendStatus(401);
    // 401: Unauthorized
}

app.get("/protected", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`Hello there ${req.user.displayName}, what do you want on the server??`);
});

app.get("/tellstory", (req, res) => { // no authentication needed because no isLoggedIn middleware
    const funnyStory = `Once upon a time, there was a developer who didn't know how to use middleware
    and they were very sad. The end.`;
    res.send(funnyStory);
});
// END: Server-only Interactions ======================

const PORT = process.env.PORT || 3000; // get port from .env file, otherwise 3000

connectDB();
mongoose.connection.on("connected", async () => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE");
    app.listen(PORT, () => {
        console.log(`server listening on port: ${PORT}...`)
    });
});
mongoose.connection.on("disconnected", () => {
    console.log("Lost connection to database")
});
