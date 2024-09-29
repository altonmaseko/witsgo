const Rental = require("../../models/Rental/rental");
// Method to check if a rental exists
const RentalController = {
    async exists(query) {
        try {
            const doc = await Rental.exists(query);
            //return doc !== null; // Returns true if a document exists, otherwise false
            if(doc){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error("Error checking if rental exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Rental.find(query);
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
// Method to insert a new record
    async insertRecord(obj) {
        try {
            const doc = await Rental.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting rental:", error);
            return { success: false, message: "Error occurred." };
        }
    },
// Method to edit an existing record
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
