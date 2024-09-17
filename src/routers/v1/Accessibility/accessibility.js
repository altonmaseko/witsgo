const express = require("express");
const router = express.Router();
const location = require("../../../controllers/Accessibility/LocationController");

// Route to get wheelchairs
router.get("/getWheelchairs", async (req, res) => {
    try {
        // Capture the filters from the query parameters
        const filters = {};


        if (req.query.campus) {
            filters.campus = req.query.campus; // You can also handle array input here if needed
        }

        if (req.query.latitude && req.query.longitude) {
            filters.latitude = req.query.latitude;
            filters.longitude = req.query.longitude;
        }

        if (req.query.type) {
            filters.type = req.query.type; // Assuming type is an array, you might want to handle it more dynamically
        }

        // Pass filters to the getDoc method
        const data = await location.getDoc(filters);

        return res.status(200).send({ data: data });
    } catch (error) {
        return res.status(500).send({ message: "An error occurred", error: error });
    }
});


module.exports = router;
