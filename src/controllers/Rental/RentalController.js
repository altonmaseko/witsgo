const Rental = require("../../models/Rental/rental");

const RentalController = {
    async exists(query) {
        try {
            const doc = await Rental.exists(query);
            return doc !== null;
        } catch (error) {
            console.error("Error checking if rental exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Rental.findOne(query);
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Rental does not exist." };
            }
        } catch (error) {
            console.error("Error getting rental:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async insertRecord(obj) {
        try {
            const doc = await Rental.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting rental:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async edits(obj) {
        try {
            const doc = await Rental.findOneAndUpdate({ _id: obj._id }, obj, { new: true });
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Rental does not exist." };
            }
        } catch (error) {
            console.error("Error updating rental:", error);
            return { success: false, message: "Error occurred." };
        }
    }
};

module.exports = RentalController;
