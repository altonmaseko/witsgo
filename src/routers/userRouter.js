const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const {
    updateUserController,
    getUserController,
    deleteUserController,
    adminLoginController,
    adminVerifyController } = require("../controllers/userControllers");


require("dotenv").config();

// create route for updating user details
router.put("/user/update/:email", updateUserController);
router.get("/user/:email", getUserController);
router.delete("/user/:email", deleteUserController);

// ADMIN USER STUFF =====================================

router.post("/admin/login", adminLoginController);

router.post("/admin/verify", adminVerifyController);

// API KEY
router.get("/api/secrets/googlemapsapikey",
    // return google maps api key
    (req, res) => {
        console.log("google maps api key requested");
        res.json({
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
        });
    }
);


module.exports = router;

