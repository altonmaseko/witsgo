const express = require("express");
const router = express.Router();
const location = require("../../../controllers/Accessibility/LocationController");

// Route to get wheelchairs
router.get("/getWheelchairs", async (req, res) => {
    try {
        const data = await location.getDoc({});

        return res.status(200).send({ data: data });
    } catch (error) {
        return res.status(500).send({ message: "An error occurred", error: error });
    }
});


module.exports = router;
