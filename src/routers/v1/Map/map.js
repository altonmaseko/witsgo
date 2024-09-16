const express = require("express");
const router = express.Router();
const axios = require("axios");
const building = require("../../../controllers/Map/BuildingController");
const Amenity = require("../../../controllers/Map/AmenityController");


router.get("/getBuildings", async (req, res) => {
    try {
        // Capture the filters from the query parameters
        const filters = {};

        if (req.query.building_name) {
            filters.building_name = req.query.building_name;
        }

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
        const data = await building.getDoc(filters);

        return res.status(200).send({ data: data });
    } catch (error) {
        return res.status(500).send({ message: "An error occurred", error: error });
    }
});

router.get("/getAmenities", async (req, res) => {
    try {
        // Capture the filters from the query parameters
        const filters = {};

        if (req.query.amenity_type) {
            filters.amenity_type = req.query.amenity_type;
        }

        if (req.query.building_id) {
            filters.building_id = req.query.building_id;
        }

        // Pass filters to the find method
        const data = await Amenity.getDoc(filters);

        return res.status(200).send({ data: data });
    } catch (error) {
        console.error("Error fetching amenities:", error);
        return res.status(500).send({ message: "An error occurred", error: error });
    }
});


module.exports = router;
