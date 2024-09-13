const AccessibleRoute = require("../../models/Accessibility/accessibleRoute");
const Location = require("../../models/Accessibility/location");

const AccessibleRouteController = {
    async exists(query) {
        try {
            const doc = await AccessibleRoute.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await AccessibleRoute.findOne(query).populate('location_id');
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

    async insertRecord(obj) {
        try {
            // Check if the location_id exists
            const locationExists = await Location.exists({ _id: obj.location_id });
            if (!locationExists) {
                return { success: false, message: "Invalid location_id provided." };
            }

            const doc = await AccessibleRoute.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    },

    async edits(obj) {
        try {
            // Check if the location_id exists
            const locationExists = await Location.exists({ _id: obj.location_id });
            if (!locationExists) {
                return { success: false, message: "Invalid location_id provided." };
            }

            const doc = await AccessibleRoute.findOneAndUpdate(
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

module.exports = AccessibleRouteController;
