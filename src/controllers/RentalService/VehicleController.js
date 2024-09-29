const Vehicle = require("../../models/Rental/vehicle");

const VehicleController = {
    async exists(query) {
        try {
            const doc = await Vehicle.exists(query);
            //return doc !== null; // Returns true if a document exists, otherwise false
           if(doc){
            return true;
        }else{
            return false;
        }
        } catch (error) {
            console.error("Error checking if vehicle exists:", error);
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
                return { success: false, message: "Vehicle does not exist." };
            }
        } catch (error) {
            console.error("Error getting vehicle:", error);
            return { success: false, message: "Error occurred." };
        }
    },
//method to insert a new record
    async insertRecord(obj) {
        try {
            const doc = await Vehicle.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting vehicle:", error);
            return { success: false, message: "Error occurred." };
        }
    },
// Method to edit an existing record
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
