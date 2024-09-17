const Vehicle = require('../../models/Transportation/vehicle');
// Method to check if a document exists
const VehicleController = {
    async exist(query) {
        try {
            const doc = await Vehicle.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Vehicle.find(query);
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
            const doc = await Vehicle.findOneAndUpdate(
                { _id: obj._id },
                { vehicle_number: obj.vehicle_number, vehicle_type: obj.vehicle_type },
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
            const doc = await Vehicle.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred while inserting record." };
        }
    }
}


module.exports = VehicleController;
