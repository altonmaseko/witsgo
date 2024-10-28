const BusSchedule = require("../../models/BusSchedule/busSchedule"); // Adjust the path as necessary


const busScheduleController = async (req, res, next) => {
    console.log("Fetching bus schedule");
    try {
        const busSchedule = await BusSchedule.find({});
        res.json({ message: "Bus schedule fetched successfully", data: busSchedule });
    } catch (error) {
        console.log("Something went wrong fetching the bus schedule");
        res.status(500).json({ message: "Something went wrong fetching the bus schedule", error: error });
    }
}

module.exports = busScheduleController; // Export the controller for use in routes
