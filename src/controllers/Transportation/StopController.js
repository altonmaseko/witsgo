const Stop = require('../../models/Transportation/stop');
// Method to check if a document exists
const StopController = {
    async exist(query) {
        try {
            const doc = await Stop.exists(query);
            return doc;
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Stop.find(query);
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
            const doc = await Stop.findOneAndUpdate(
                { _id: obj._id },
                { stop_name: obj.stop_name, location: obj.location },
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
            const doc = await Stop.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred while inserting record." };
        }
    }
}

module.exports = StopController;
