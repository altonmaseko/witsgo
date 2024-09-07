const express = require("express");
const router = express.Router();
const passport = require("passport")
const { authFailureController, logoutController, authSuccessController, verifyLoginController } = require("../controllers/googleAuthController.js");

// Starts authentication process
router.get("/auth/google",
    passport.authenticate("google", {
        scope: ["email", "profile"] // The data that we want from the users google account
    })
);

// After user logs in, google will redirect them to this route
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/auth/success", // if authentication is successful
    failureRedirect: "/auth/failure" // if authentication fails
}));

router.get("/auth/success", authSuccessController);

router.get("/auth/failure", authFailureController);

router.get("/logout", logoutController);

router.get("/verifylogin", verifyLoginController);

module.exports = router;
