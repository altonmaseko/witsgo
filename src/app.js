const path = require("path")
const express = require("express")
const session = require("express-session")
const cors = require('cors');
const mongoose = require("mongoose")
const connectDatabase = require("./config/connectDB")
const passport = require("passport")
const cookieParser = require('cookie-parser');
const http = require("http")
require("dotenv").config()
require("./auth");
const app = express()

// ROUTES ==========================================
const googleAuthRouter = require("./routers/googleAuthRouter");
const userRouter = require("./routers/userRouter");
// END: ROUTES =====================================

// SETUP MIDDLEWARE [not our own] =================== 
app.use(express.json());
app.use(cookieParser());
// CORS -------------
const allowedOrigins = [process.env.CLIENT_URL, 'http://localhost:5000', 'http://localhost:5001'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// app.use(cors()); // Causes google authentication to fail

// END: CORS -------------

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// END: MIDDLEWARE ================================

const route_optimize = require("./routers/v1/route_optimize/route_optimize")
app.use("/v1/route_optimize", route_optimize);

const dbManage = require("./routers/v1/database_manage/data")
app.use("/v1/admin", dbManage);

const maps = require("./routers/v1/Map/map")
app.use("/v1/map", maps);


const bus = require("./routers/v1/Schedule/busSchedule")
app.use("/v1/schedule", bus);


// LIAM STUFF
const rental = require("./routers/v1/Rental/rental")
app.use("/v1/rental", rental);
// ======


const accessibility = require("./routers/v1/Accessibility/accessibility")
app.use("/v1/accessibility", accessibility);

const userRoutes = require("./routers/v1/UserRoutes/userRoutes")
app.use("/v1/userRoutes", userRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to the WITSGO server, what are you doing here bruv?? Go to the frontend!");
});

app.use(googleAuthRouter);
app.use(userRouter);

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


app.use((req, res) => {
    res.status(404).send({ "data": "unknown_endpoint" });
});


const PORT = process.env.PORT || 3000; // get port from .env file, otherwise 3000

// Create an HTTP server that both Express and WebSockets will use
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}...`)
});

// =================================================

// =================================================

// =================================================

// SOCKETS.io SERVER ====================================
const instrument = require("@socket.io/admin-ui").instrument;
const io = require('socket.io')(server, {
    cors: {
        // origin: "*"
        origin: allowedOrigins,
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log(`new socket client: ${socket.id}`);
    socket.on("client-to-server", (data) => {
        console.log(data);
        // get the socket id
        if (data.room) {
            data.id = socket.id;
            io.to(data.room).emit("server-to-client", data);
        } else {
            console.log('no room specified');
        }
    })

    socket.on("join-room", (room, cb) => {
        socket.join(room);
        console.log(`client joined room: ${room}`);
        if (cb) cb(`Joined Room: ${room}`);
    })

    socket.on("leave-room", (room, cb) => {
        socket.leave(room);
        console.log(`client left room: ${room}`);
        if (cb) cb(`Left Room: ${room}`);
    })
})

instrument(io, { auth: false });

// Think of a socket as representing a connection from server to one client.

/*
Callback Function: Sent by client and will be executed (on the client side), once the server responds,
by calling the callback function with any parameters. It is a good way for the server to let the client 
know that the connection succeeded and action was completed successfully.
*/


/*
socket.emit(event, data): Sends the message only to the client that triggered the event.
io.emit(event, data): Sends the message to all connected clients.
socket.broadcast.emit(event, data): Sends the message to all connected clients except the one that triggered the event.
*/

// PRINT ALL .env variables
console.log("ENVIRONMENT VARIABLES: ");
console.log("---------------------------------");
console.log(`PORT: ${process.env.PORT}`);
console.log(`CONNECTION_URI: ${process.env.CONNECTION_URI}`);
console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID}`);
console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET}`);
console.log(`SESSION_SECRET: ${process.env.SESSION_SECRET}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
console.log(`CLIENT_URL: ${process.env.CLIENT_URL}`);
console.log(`SERVER_URL: ${process.env.SERVER_URL}`);
console.log("---------------------------------");
