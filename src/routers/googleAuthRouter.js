const express = require("express");
const router = express.Router();
const passport = require("passport")
const {
    startAuthController,
    googleCallbackController,
    authFailureController,
    logoutController,
    authSuccessController,
    verifyLoginController } = require("../controllers/googleAuthControllers.js");

// Starts authentication process
router.get("/auth/google", startAuthController);

// After user logs in through google, google will redirect to this route
router.get("/google/callback", googleCallbackController);

// If authentication is successful, googleCallbackController will redirect user here
router.get("/auth/success", authSuccessController);

// If authentication fails, googleCallbackController will redirect user here
router.get("/auth/failure", authFailureController);

router.get("/verifylogin", verifyLoginController);

router.post("/logout", logoutController);


module.exports = router;

