const Station = require("../../models/Rental/station");
// Method to check if a station exists
const StationController = {
    async exists(query) {
        try {
            const doc = await Station.exists(query);
           //return doc !== null; // Returns true if a document exists, otherwise false
           if(doc){
            return true;
        }else{
            return false;
        }
        } catch (error) {
            console.error("Error checking if station exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Station.find(query);
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Station does not exist." };
            }
        } catch (error) {
            console.error("Error getting station:", error);
            return { success: false, message: "Error occurred." };
        }
    },
// Method to insert a new record
    async insertRecord(obj) {
        try {
            const doc = await Station.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting station:", error);
            return { success: false, message: "Error occurred." };
        }
    },
// Method to edit an existing record
    async edits(obj) {
        try {
            const doc = await Station.findOneAndUpdate({ _id: obj._id }, obj, { new: true });
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Station does not exist." };
            }
        } catch (error) {
            console.error("Error updating station:", error);
            return { success: false, message: "Error occurred." };
        }
    }
};

module.exports = StationController;
