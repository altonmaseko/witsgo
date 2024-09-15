const Building = require("../../models/Map/building");

const BuildingController = {
    async exist(query) {
        try {
            const doc = await Building.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Building.findOne(query);
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error retrieving document:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async edits(obj) {
        try {
            const doc = await Building.findOneAndUpdate(
                { _id: obj._id },
                {
                    building_name: obj.building_name,
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                    campus: obj.campus,
                    type: obj.type,
                    code: obj.code,
                    created_at: Date.now()
                },
                { new: true, upsert: true }
            );

            if (!doc) {
                return { success: false, message: "Operation failed" };
            }

            return { success: true, data: doc };
        } catch (error) {
            console.error("Error updating or inserting document:", error);
            return { success: false, message: "Error occurred" };
        }
    },

    async insertRecord(obj) {
        try {
            const newBuilding = new Building(obj);
            const savedBuilding = await newBuilding.save();
            return { success: true, data: savedBuilding };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    }
};

module.exports = BuildingController;
