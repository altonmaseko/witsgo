const jwt = require('jsonwebtoken');
const passport = require('passport');

// INITIALIZE AUTHENTICATION AND CALLBACK ==========================================

const startAuthController = (req, res, next) => {
    const redirect = req.query.redirect;

    // encodeURIComponent:  It converts characters that are not valid in a URL 
    // (like spaces, special characters, and punctuation) into a format that 
    // can be safely transmitted via a URL.
    const state = encodeURIComponent(redirect);

    const authenticator = passport.authenticate("google", {
        scope: ["email", "profile"],
        // state will be included in the authentication request as query parameter to google,
        // and google will include it unchanged when redirecting back to our server.
        state: state,
        prompt: "consent" // after logging
    });
    authenticator(req, res, next);
}

const googleCallbackController = (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/failure');
        }

        return res.redirect(`/auth/success?redirect=${req.query.state}`);
    })(req, res, next);
}

// AUTHENTICATION SUCCESS AND FAILURE ==========================================

const authFailureController = (req, res) => {
    res.send("Something went wrong while trying to authenticate you.");
}

const authSuccessController = (req, res) => {

    // AFTER google authentication is successful, we create our own accessToken to store
    const redirect = decodeURIComponent(req.query.redirect);

    const user = req.user;
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "2m" });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });

    res.redirect(redirect);
}

// ============================================================================

const verifyLoginController = (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.json({
            success: false,
            isLoggedIn: false,
            message: "User is not logged in",
            status: 200
        });
        return;
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                isLoggedIn: false,
                message: "User has invalid jwt",
                status: 200
            });
        }
        res.json({
            user,
            isLoggedIn: true,
            success: true,
            message: "User is logged in",
            status: 200
        });
    });
}


const logoutController = (req, res) => {
    const loginPage = "http://127.0.0.1:5501/logintest/login.html";

    req.session.destroy(); // req.user will be undefined
    res.clearCookie("accessToken");
    res.clearCookie("connect.sid");

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.redirect(loginPage);
}

module.exports = {
    startAuthController,
    googleCallbackController,
    authFailureController,
    logoutController,
    authSuccessController,
    verifyLoginController
}; 