const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// INITIALIZE AUTHENTICATION AND CALLBACK ==========================================

function isMobileRequest(req) {
    return /mobile|android|iphone/i.test(req.headers['user-agent']);
}

function isIOSDevice(req) {
    const userAgent = req.headers['user-agent'];
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
}

const startAuthController = (req, res, next) => {
    const redirect = req.query.redirect;

    const state = Buffer.from(JSON.stringify({
        redirect: encodeURIComponent(redirect),
        register: req.query.register === "true"
    })).toString("base64");

    // show prompt only if registering
    let prompt = req.query.register === "true" ? "select_account" : "none";


    if (isMobileRequest(req)) {
        console.log("***Mobile Request");
        prompt = "select_account";
    }

    if (isIOSDevice(req)) {
        console.log("startAuthController: IOS DEVICE DETECTED")
        prompt = "select_account";
    } else {
        console.log("startAuthController: NOT ios DEVICE")
        prompt = "none";
    }

    prompt = "select_account"; // for ios

    const authenticator = passport.authenticate("google", {
        scope: ["email", "profile",],
        // state will be included in the authentication request as query parameter to google,
        // and google will include it unchanged when redirecting back to our server.
        state: state,
        prompt: prompt
    });
    authenticator(req, res, next);
}

const googleCallbackController = (req, res, next) => {
    passport.authenticate("google", async (err, user, info) => {
        if (err) {
            console.error("Error code:", err.code);
            console.error("Error message:", err.message);
            console.error("Full Authentication error:", err);
            return res.redirect('/auth/failure');
            // return next(err);
        }
        if (!user) {
            return res.redirect('/auth/failure');
        }

        let state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());

        // if valid role exists, user already registered before.
        // So redirect to homepage, regardless of whether they clicked register or login.
        if (user.role != "not-registered") {
            state.redirect = encodeURIComponent(process.env.CLIENT_URL);
        }

        // if user is trying to login but has not registered before, redirect to register page
        if (state.register == false) { // trying to login
            if (user.role == 'not-registered') { // user has not registered before
                res.redirect(`${process.env.CLIENT_URL}?servermessage=You need to register first before logging in!`);

                // if user was created, delete it
                try {
                    const result = await User.findOneAndDelete({ email: user.email });
                    console.log("Deleted user who is not registered", result.email);
                } catch (error) {
                    console.log("Error deleting user who is not registered", error);
                }

                return
            }
        }

        return res.redirect(`/auth/success?redirect=${state.redirect}&email=${user.email}`);
    })(req, res, next);
}

// AUTHENTICATION SUCCESS AND FAILURE ==========================================

const authFailureController = (req, res) => {


    const error = req.query.error;
    let message = "An unknown error occurred during authentication.";

    switch (error) {
        case 'token_expired':
            message = "Your session has expired. Please try logging in again.";
            break;
        case 'google_auth_required':
            message = "Additional authentication required by Google. Please ensure you're signed in to Google and try again.";
            break;
        case 'no_user':
            message = "No user found. Please ensure you're using the correct Google account.";
            break;
        default:
            message = "An unknown error occurred during authentication.";
            break;
    }

    // Read the HTML template
    let html = fs.readFileSync(path.join(__dirname, '..', 'backend_pages', 'authFailurePage.html'), 'utf8');

    // Replace placeholders
    html = html.replace('{{ERROR_MESSAGE}}', message);
    html = html.replace('{{FRONTEND_URL}}', process.env.CLIENT_URL);

    // Clear any existing authentication cookies    
    res.clearCookie("accessToken", {
        // httpOnly: true, // trying off for iphone
        sameSite: "None",
        secure: true,
        path: "/",
    });
    // req.session.destroy(); // not using session

    // Send the HTML response
    res.send(html);

}



const authSuccessController = async (req, res) => {



    // AFTER google authentication is successful, we create our own accessToken to store
    const redirect = decodeURIComponent(req.query.redirect);

    const user = await User.findOne({ email: req.query.email });

    if (!user) {
        res.redirect("/auth/failure");
        return;
    }

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.cookie("accessToken", accessToken, {
        // httpOnly: true, // trying off for iphone
        sameSite: "None",
        secure: true,
        path: "/",
        // maxAge: 1000 * 60 * 4 // 4 minutes
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    });

    // Read the HTML file
    const filePath = path.join(__dirname, '..', 'backend_pages', 'loaderPageRedirect.html');
    let loaderPageHtml = fs.readFileSync(filePath, 'utf8');

    // Replace the placeholder with the actual redirect URL
    const redirectUrl = `${redirect}?email=${encodeURIComponent(user.email)}`;
    loaderPageHtml = loaderPageHtml.replace('{{REDIRECT_URL}}', redirectUrl);

    // Send the modified HTML
    res.send(loaderPageHtml);

}

// ============================================================================

const verifyLoginController = (req, res) => {
    console.log("Cookies Received:", req.cookies);

    // backup access token
    let accessTokenFromQuery = req.query.token;
    console.log("accessToken from QUERY:", accessTokenFromQuery);
    // end: backup access token

    let accessToken = req.cookies.accessToken;
    if (!accessToken) {
        accessToken = accessTokenFromQuery;
        if (!accessToken) {
            console.log("No accessToken");
            res.json({
                success: false,
                isLoggedIn: false,
                message: "NO accessToken FOUND",
                status: 200
            });
            return;
        }
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                console.log("TOKEN EXPIRED");
                return res.json({
                    success: false,
                    isLoggedIn: false,
                    message: "TOKEN EXPIRED",
                    status: 200
                });
            }
            console.log("INVALID JWT");
            return res.json({
                success: false,
                isLoggedIn: false,
                message: "INVALID JWT",
                status: 200
            });
        }
        console.log("JWT IS VALID");

        const userFromDatabase = await User.findOne({ googleId: user.user.googleId });

        console.log("User from database:", userFromDatabase);

        if (!userFromDatabase) {
            console.log("Logout: JWT is valid but User not found in database");
            return res.json({
                success: false,
                isLoggedIn: false,
                message: "JWT IS VALID, BUT USER NOT IN DATABASE",
                status: 200
            });
        }


        res.json({
            user,
            isLoggedIn: true,
            success: true,
            message: "JWT IS VALID",
            status: 200
        });
    });
}


const logoutController = (req, res) => {
    console.log("Logging out request made");
    const loginPage = `${process.env.CLIENT_URL}`;

    // req.session.destroy(); // not using session
    res.clearCookie("accessToken", {
        // httpOnly: true, // trying off for iphone
        sameSite: "None",
        secure: true,
        path: "/",
    });
    res.clearCookie("connect.sid");

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage", "executionContexts"'); // trying for ios
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json({
        success: true,
        message: "User logged out successfully",
        status: 200
    });



}

module.exports = {
    startAuthController,
    googleCallbackController,
    authFailureController,
    logoutController,
    authSuccessController,
    verifyLoginController
}; 