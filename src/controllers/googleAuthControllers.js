const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// INITIALIZE AUTHENTICATION AND CALLBACK ==========================================

const startAuthController = (req, res, next) => {
    const redirect = req.query.redirect;

    // encodeURIComponent:  It converts characters that are not valid in a URL 
    // (like spaces, special characters, and punctuation) into a format that 
    // can be safely transmitted via a URL.
    const state = encodeURIComponent(redirect);

    // show prompt only if registering
    const prompt = req.query.register === "true" ? "consent" : "none";

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
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/failure');
        }

        return res.redirect(`/auth/success?redirect=${req.query.state}&email=${user.email}`);
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

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "2m" });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        // path: "/",
        maxAge: 1000 * 60 * 4 // 4 minutes
    });

    //     // res.redirect(`${redirect}?email=${user.email}`);

    //     // Send a response with a script to redirect after a short delay
    //     res.send(`
    //   <html>
    //     <body>
    //       <script>
    //         setTimeout(() => {
    //           window.location.href = "${redirect}?email=${user.email}";
    //         }, 500);  // 500ms delay
    //       </script>
    //     </body>
    //   </html>
    // `
    //     );

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

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
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
    const loginPage = `${process.env.CLIENT_URL}`;

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