const Route = require("../../models/BusSchedule/busSchedule"); // Adjust the path as necessary

const BusScheduleController = {
    // Method to check if a bus route exists based on a query
    async exists(query) {
        try {
            const doc = await Route.exists(query);
            return doc !== null; // Returns true if a document exists
        } catch (error) {
            console.error("Error checking if route exists:", error);
            return false; // Returns false on error
        }
    },

    // Method to get bus schedule documents based on a query
    async getDoc(query) {
        try {
            const doc = await Route.find(query);
            if (doc.length > 0) {
                return { success: true, data: doc }; // Returns success with data if found
            } else {
                return { success: false, message: "No routes found." }; // Message if no routes found
            }
        } catch (error) {
            console.error("Error getting bus schedule:", error);
            return { success: false, message: "Error occurred." }; // Returns error message
        }
    },

    // Method to insert a new bus schedule record
    async insertRecord(obj) {
        try {
            const doc = await Route.create(obj); // Creates a new record
            return { success: true, data: doc }; // Returns success with the created record
        } catch (error) {
            console.error("Error inserting bus schedule:", error);
            return { success: false, message: "Error occurred." }; // Returns error message
        }
    },

    // Method to edit an existing bus schedule record
    async edits(obj) {
        try {
            const doc = await Route.findOneAndUpdate({ _id: obj._id }, obj, { new: true }); // Updates record
            if (doc) {
                return { success: true, data: doc }; // Returns success with updated record
            } else {
                return { success: false, message: "Route does not exist." }; // Message if route not found
            }
        } catch (error) {
            console.error("Error updating bus schedule:", error);
            return { success: false, message: "Error occurred." }; // Returns error message
        }
    }
};

module.exports = BusScheduleController; // Export the controller for use in routes
