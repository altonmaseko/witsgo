const express = require("express");
const router = express.Router();
const path = require("path");


// Security: Validate and sanitize input

const allowedDatabases = ["Accessibility","Map","UserRoutes"];
const allowedCollections = [
    "AccessibleRoute",
    "Location",
    "Amenity",
    "Building",
    "PointOfInterest",
    "Room",
    "UserRoute",
    "Preferences"



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
        console.log(process.env.CONNECTION_URI+db);

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
            const returned = await controller.insertRecord(data);
            console.log(returned);
        } else if (typeof controller.edits === 'function'){
            controller.edits(data);
        }else{
            return res.status(200).send({ message: "Operation not valid for this model" });

        }

        res.status(200).send({ message: "Data processed successfully" });

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
            controller.edits(data);
        }else{
            return res.status(200).send({ message: "Operation not valid for this model" });

        }

        res.status(200).send({ message: "Data processed successfully" });

    } catch (error) {
        console.error("Error loading controller:", error);
        res.status(500).send({ message: "Server error: Unable to process request" });
    }
});



module.exports = router;
