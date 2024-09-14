const PointOfInterest = require("../../models/Map/poi");

const PointOfInterestController = {
    async exist(query) {
        try {
            const doc = await PointOfInterest.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await PointOfInterest.findOne(query);
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
            const doc = await PointOfInterest.findOneAndUpdate(
                { _id: obj._id },
                {
                    poi_name: obj.poi_name,
                    latitude: obj.latitude,
                    longitude: obj.longitude,
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
            const newPointOfInterest = new PointOfInterest(obj);
            const savedPointOfInterest = await newPointOfInterest.save();
            return { success: true, data: savedPointOfInterest };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    }
};

module.exports = PointOfInterestController;
