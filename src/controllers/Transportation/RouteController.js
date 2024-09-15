const Route = require('../../models/Transportation/route');

const RouteController = {
    async exist(query) {
        try {
            const doc = await Route.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Route.find(query).populate('stops');
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

    async edits(obj) {
        try {
            const doc = await Route.findOneAndUpdate(
                { _id: obj._id },
                { route_name: obj.route_name, stops: obj.stops },
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

    async insertRecord(obj) {
        try {
            const doc = await Route.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred while inserting record." };
        }
    }
}

module.exports = RouteController;
