const Station = require("../../models/Rental/station");

const StationController = {
    async exists(query) {
        try {
            const doc = await Station.exists(query);
            return doc !== null;
        } catch (error) {
            console.error("Error checking if station exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Station.findOne(query);
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

    async insertRecord(obj) {
        try {
            const doc = await Station.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting station:", error);
            return { success: false, message: "Error occurred." };
        }
    },

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
