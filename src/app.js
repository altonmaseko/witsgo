const path = require("path")
const express = require("express")
const session = require("express-session")
const cors = require('cors');
const mongoose = require("mongoose")
const connectDB = require("./config/connectDB")
const passport = require("passport")
require("dotenv").config()
require("./auth");

const app = express()
app.use(express.json());
app.use(cors());

const route_optimize = require("./routers/v1/route_optimize/route_optimize")


app.get("/work",(req,res)=>{
    res.send("WORKING");
})

app.use("/v1/route_optimize",route_optimize);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    // req.user is set by passport if the user is successfully authenticated by googles
    req.user ? next() : res.sendStatus(401);
    // 401: Unauthorized
}

app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});

app.get("/login", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
});


app.use("/", require("./routers/googleAuthRouter"));

app.get("/protected", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`Hello there ${req.user.displayName}`);
});

app.get("/tellstory", (req, res) => { // no authentication needed because no isLoggedIn middleware
    const funnyStory = `Once upon a time, there was a developer who didn't know how to use middleware
    and they were very sad. The end.`;
    res.send(funnyStory);
});


const PORT = process.env.PORT || 3001; // get port from .env file, otherwise 3000

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
