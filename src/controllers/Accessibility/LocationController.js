const Location = require("../../models/Accessibility/location");

const LocationController = {
    async exists(query) {
        try {
            const doc = await Location.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Location.find(query);
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error getting document:", error);
            return { success: false, message: "Error occurred" };
        }
    },
// Method to insert a new record
    async insertRecord(obj) {
        try {
            const doc = await Location.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    },
// Method to edit an existing record
    async edits(obj) {
        try {
            const doc = await Location.findOneAndUpdate(
                { _id: obj._id },
                obj,
                { new: true }
            );
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error updating record:", error);
            return { success: false, message: "Error occurred" };
        }
    }
};

module.exports = LocationController;
