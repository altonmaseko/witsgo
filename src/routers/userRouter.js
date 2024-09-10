const express = require("express");
const router = express.Router();
const passport = require("passport");
const { updateUserController } = require("../controllers/userControllers");

// create route for updating user details
router.put("/user/update/:email", updateUserController);

module.exports = router;

