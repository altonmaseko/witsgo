const Tracking = require('../../models/Transportation/tracking');
// Method to check if a document exists

const TrackingController = {
    async exist(query) {
        try {
            const doc = await Tracking.exists(query);
            return doc; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Tracking.find(query).populate('vehicle_id').populate('route_id').populate('current_stop_id');
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error retrieving document:", error);
            return { success: false, message: "Error occurred while retrieving document." };
        }
    },
// Method to edit an existing record
    async edits(obj) {
        try {
            const doc = await Tracking.findOneAndUpdate(
                { _id: obj._id },
                { vehicle_id: obj.vehicle_id, route_id: obj.route_id, current_stop_id: obj.current_stop_id, timestamp: obj.timestamp, latitude: obj.latitude, longitude: obj.longitude },
                { new: true, upsert: true }
            );
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Operation failed." };
            }
        } catch (error) {
            console.error("Error updating document:", error);
            return { success: false, message: "Error occurred while processing request." };
        }
    },
// Method to insert a new record
    async insertRecord(obj) {
        try {
            const doc = await Tracking.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred while inserting record." };
        }
    }
}

module.exports = TrackingController;
