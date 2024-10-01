const express = require("express");
const router = express.Router();
const NavigationHistoryController = require("../../../controllers/UserRoutes/NavigationHistoryController");
const route = require("../../../controllers/UserRoutes/RoutesController");
const PreferencesController = require("../../../controllers/UserRoutes/PreferencesController");
const uuid = require("../../../misc/generateUUID");
const { truncateSync } = require("fs");


router.post("/insertRoute", async (req, res) => {
    // Ensure that the request body is not empty
    if (!req.body){
        return res.status(400).send({"message": "missing parameters"});
    }
      
    try {
        // Extract data from request body
        const { user_id, start_location, end_location, route_data } = req.body;
        
        if (!start_location || !end_location || !route_data) {
            return res.status(400).send({"message": "missing required fields"});
        }

        // Construct the data object
        let data = {
            "route_id": uuid(),
            "user_id": user_id,
            "start_location": {
                "latitude": start_location.latitude,
                "longitude": start_location.longitude
            },
            "end_location": {
                "latitude": end_location.latitude,
                "longitude": end_location.longitude
            },
            "route_data": route_data
        };

        // Call the `edits` method from the RoutesController
        const result = await route.insertRecord(data);

        if (result.success) {
            return res.status(200).send({"success": "true","data":result});
        } else {
            return res.status(200).send({"data": result.message});
        }
    } catch (error) {
        return res.status(400).send({"data": error.message});
    }
});

router.post("/insertNavHistory", async (req, res) => {
    // Ensure that the request body is not empty
    if (!req.body) {
        return res.status(400).json({ message: "Missing parameters" });
    }

    try {
        // Extract data from the request body
        const { user_id, route_id } = req.body;

        // Validate required fields
        if (!user_id || !route_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Construct the data object
        const navigationHistoryObj = {
            user_id: user_id,
            route_id: route_id
        };

        // Call the `addRecord` method from the NavigationHistoryController
        const result = await NavigationHistoryController.addRecord(navigationHistoryObj);

        if (result.success) {
            return res.status(200).json({
                success: true
            });
        } else {
            return res.status(409).json({
                success: false
            });
        }
    } catch (error) {
        console.error("Error inserting navigation history:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while inserting navigation history."
        });
    }
});

router.post("/updatePreference", async (req, res) => {
    const { user_id, preference_type, preferences_value } = req.body;

    // Validate the request body
    if (!user_id || !preference_type || preferences_value === undefined) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: user_id, preference_type, or preferences_value."
        });
    }

    // Prepare the object for editing
    const preferenceObj = {
        user_id:user_id,
        preferences_type:preference_type,
        preferences_value:preferences_value
    };

    try {
        const result = await PreferencesController.edits(preferenceObj);
        
        if (result.success) {
            return res.status(200).json({
                success: true,
                data: result.data,
                message: "Preference updated successfully."
            });
        } else {
            return res.status(500).json({
                success: false,
                message: result.message || "Failed to update preference."
            });
        }
    } catch (error) {
        console.error("Error updating preference:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating preference."
        });
    }
});

router.get("/getPreferences", async (req, res) => {
    const { user_id } = req.query; 

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: user_id"
        });
    }

    // Prepare the object for editing
    const preferenceObj = {
        user_id:user_id
    };

    try {
        const result = await PreferencesController.getDoc(preferenceObj);
        
        if (result.success) {
            return res.status(200).json({
                success: true,
                data: result.data,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: result.message || "Failed to get record"
            });
        }
    } catch (error) {
        console.error("Error updating preference:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while getting preference."
        });
    }
});



module.exports = router;
