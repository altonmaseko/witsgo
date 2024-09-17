const express = require("express");
const router = express.Router();
const navHistory = require("../../../controllers/UserRoutes/NavigationHistoryController");
const route = require("../../../controllers/UserRoutes/RoutesController");
const preference = require("../../../controllers/UserRoutes/PreferencesController");
const uuid = require("../../../misc/generateUUID");


router.post("/insertRoute", async (req, res) => {
    // Ensure that the request body is not empty
    if (!req.body){
        return res.status(400).send({"message": "missing parameters"});
    }
      
    try {
        // Extract data from request body
        const { start_location, end_location, duration, route_data } = req.body;
        
        if (!start_location || !end_location || !duration || !route_data) {
            return res.status(400).send({"message": "missing required fields"});
        }

        // Construct the data object
        let data = {
            "route_id": uuid(),
            "user_id": req.user_id,
            "start_location": {
                "latitude": start_location.latitude,
                "longitude": start_location.longitude
            },
            "end_location": {
                "latitude": end_location.latitude,
                "longitude": end_location.longitude
            },
            "duration": duration,
            "route_data": route_data
        };

        // Call the `edits` method from the RoutesController
        const result = await route.insertRecord(data);

        if (result.success) {
            return res.status(200).send({"data": "success"});
        } else {
            return res.status(200).send({"data": result.message});
        }
    } catch (error) {
        return res.status(400).send({"data": error.message});
    }
});



module.exports = router;
