const express = require("express");
const router = express.Router();
const passport = require("passport");
const { updateUserController, getUserController, deleteUserController, adminLoginController } = require("../controllers/userControllers");

require("dotenv").config();

// create route for updating user details
router.put("/user/update/:email", updateUserController);
router.get("/user/:email", getUserController);
router.delete("/user/:email", deleteUserController);


router.get("/api/secrets/googlemapsapikey",
    // return google maps api key
    (req, res) => {
        console.log("google maps api key requested");
        res.json({
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
        });
    }
);


// ADMIN USER STUFF =====================================

router.post("/admin/login", adminLoginController);


module.exports = router;

