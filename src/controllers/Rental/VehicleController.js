const Vehicle = require("../../models/Rental/vehicle");

const VehicleController = {
    async exists(query) {
        try {
            const doc = await Vehicle.exists(query);
            return doc !== null;
        } catch (error) {
            console.error("Error checking if vehicle exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Vehicle.findOne(query);
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Vehicle does not exist." };
            }
        } catch (error) {
            console.error("Error getting vehicle:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async insertRecord(obj) {
        try {
            const doc = await Vehicle.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting vehicle:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async edits(obj) {
        try {
            const doc = await Vehicle.findOneAndUpdate({ _id: obj._id }, obj, { new: true });
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Vehicle does not exist." };
            }
        } catch (error) {
            console.error("Error updating vehicle:", error);
            return { success: false, message: "Error occurred." };
        }
    }
};

module.exports = VehicleController;
