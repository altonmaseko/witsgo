const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// INITIALIZE AUTHENTICATION AND CALLBACK ==========================================

function isMobileRequest(req) {
    return /mobile|android|iphone/i.test(req.headers['user-agent']);
}

const startAuthController = (req, res, next) => {
    const redirect = req.query.redirect;

    const state = JSON.stringify({
        redirect: encodeURIComponent(redirect),
        register: req.query.register === "true"
    });

    // show prompt only if registering
    let prompt = req.query.register === "true" ? "consent" : "none";


    if (isMobileRequest(req)) {
        console.log("***Mobile Request");
        prompt = "select_account";
    }

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
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/failure');
        }

        let state = JSON.parse(req.query.state);

        // if password exists, user already registered before.
        // So redirect to homepage, regardless of whether they clicked register or login.
        if (user.password) {
            state.redirect = encodeURIComponent(process.env.CLIENT_URL);
        }

        // if user is trying to login but has not registered before, redirect to register page
        if (state.register == false) { // trying to login
            if (!user.password) { // user has not registered before
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
    res.send("Something went wrong while trying to authenticate you.");
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
        httpOnly: true,
        sameSite: "none",
        secure: true,
        // path: "/",
        // maxAge: 1000 * 60 * 4 // 4 minutes
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    });

    // Read the HTML file
    const filePath = path.join(__dirname, '..', 'config', 'loaderPageRedirect.html');
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

    const accessToken = req.cookies.accessToken;
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

    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            console.log("INVALID JWT");
            return res.json({
                success: false,
                isLoggedIn: false,
                message: "INVALID JWT",
                status: 200
            });
        }
        console.log("JWT IS VALID");

        const userFromDatabase = await User.findOne({ googleId: user.googleId });

        console.log("User from database:", userFromDatabase);

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

    req.session.destroy(); // req.user will be undefined
    res.clearCookie("accessToken");
    res.clearCookie("connect.sid");

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
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