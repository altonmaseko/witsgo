const express = require("express");
const router = express.Router();
const path = require("path");


// Security: Validate and sanitize input
const allowedDatabases = ["Accessibility","Map","UserRoutes","RentalService","Transportation"];
const allowedCollections = [
    "Users",
    "Routes",
    "Preferences",
    "NavigationHistory",
    "Route",
    "Schedule",
    "Stop",
    "Tracking",
    "Vehicle",
    "Rental",
    "Station",
    "Student",
    "Amenity",
    "Building",
    "PointOfInterest",
    "Room",
    "AccessibleRoute",
    "Location"
];


router.post("/get_data", async (req, res) => {
    try {
        // Input validation
        if (!req.body || !req.body["database"] || !req.body["collection"] || !req.body["data"]) {
            res.status(400).send({ message: "Missing required parameters" });
            return;
        }

        console.log(req.body);

        const db = req.body["database"];
        const collection = req.body["collection"];
        const data = req.body["data"];


        if (!allowedDatabases.includes(db) || !allowedCollections.includes(collection)) {
            res.status(400).send({ message: "Invalid database or collection" });
            return;
        }

        // Dynamically load the controller
        let requireString = path.resolve(__dirname, "../../../controllers", db, `${collection}Controller`);

        console.log(requireString)

        const controller = require(requireString);

        // mongoose.createConnection(CONNECTION_URI+"/"+database)
        if (typeof controller.getDoc === 'function') {
            const result = await controller.getDoc(data);

            if (result.success) {
                return res.status(200).send({ data: result.data });
            } else {
                return res.status(404).send({ message: result.message });
            }

        } else {
            return res.status(400).send({ message: "Operation not valid for this model" });
        }


    } catch (error) {
        console.error("Error loading controller:", error);
        res.status(500).send({ message: "Server error: Unable to process request" });
    }
});

  



router.post("/insert_data",async (req,res)=>{
    try {
        // Input validation
        if (!req.body || !req.body["database"] || !req.body["collection"] || !req.body["data"]) {
            res.status(400).send({ message: "Missing required parameters" });
            return;
        }

        console.log(req.body);

        const db = req.body["database"];
        const collection = req.body["collection"];
        const data = req.body["data"];


        if (!allowedDatabases.includes(db) || !allowedCollections.includes(collection)) {
            res.status(400).send({ message: "Invalid database or collection" });
            return;
        }

        // Dynamically load the controller
        let requireString = path.resolve(__dirname, "../../../controllers", db, `${collection}Controller`);

        console.log(requireString)

        const controller = require(requireString);


        if (typeof controller.insertRecord === 'function') {
            const result = await controller.insertRecord(data);
            if (result.success) {
                return res.status(200).send({ data: result.data });
            } else {
                return res.status(404).send({ message: result.message });
            }
        } else if (typeof controller.edits === 'function'){
            const result = await controller.edits(data);
            if (result.success) {
                return res.status(200).send({ data: result.data });
            } else {
                return res.status(404).send({ message: result.message });
            }
        }else{
            return res.status(200).send({ message: "Operation not valid for this model" });
        }


    } catch (error) {
        console.error("Error loading controller:", error);
        res.status(500).send({ message: "Server error: Unable to process request" });
    }
});



router.put("/update_data",async (req,res)=>{
    try {
        // Input validation
        if (!req.body || !req.body["database"] || !req.body["collection"] || !req.body["data"]) {
            res.status(400).send({ message: "Missing required parameters" });
            return;
        }

        console.log(req.body);

        const db = req.body["database"];
        const collection = req.body["collection"];
        const data = req.body["data"];


        if (!allowedDatabases.includes(db) || !allowedCollections.includes(collection)) {
            res.status(400).send({ message: "Invalid database or collection" });
            return;
        }

        // Dynamically load the controller
        let requireString = path.resolve(__dirname, "../../../controllers", db, `${collection}Controller`);

        console.log(requireString)

        const controller = require(requireString);


        if (typeof controller.edits === 'function'){
            const result = await controller.edits(data);
            if (result.success) {
                return res.status(200).send({ data: result.data });
            } else {
                return res.status(404).send({ message: result.message });
            }
        }else{
            return res.status(200).send({ message: "Operation not valid for this model" });

        }

    } catch (error) {
        console.error("Error loading controller:", error);
        res.status(500).send({ message: "Server error: Unable to process request" });
    }
});



module.exports = router;
