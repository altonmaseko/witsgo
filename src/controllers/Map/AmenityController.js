const Amenity = require("../../models/Map/amenity");

const AmenityController = {
    async exist(query) {
        try {
            const doc = await Amenity.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Amenity.find(query);
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
//method to edit an existing record
    async edits(obj) {
        try {
            const doc = await Amenity.findOneAndUpdate(
                { building_id: obj.building_id, amenity_type: obj.amenity_type },
                {
                    amenity_type: obj.amenity_type,
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
//insert a new record
    async insertRecord(obj) {
        try {
            const newAmenity = new Amenity(obj);
            const savedAmenity = await newAmenity.save();
            return { success: true, data: savedAmenity };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    }
};

module.exports = AmenityController;
