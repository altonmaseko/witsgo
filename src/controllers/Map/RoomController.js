const Room = require("../../models/Map/room");

const RoomController = {
    async exist(query) {
        try {
            const doc = await Room.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Room.findOne(query);
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
            const doc = await Room.findOneAndUpdate(
                { _id: obj._id },
                {
                    room_name: obj.room_name,
                    building_id: obj.building_id,
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
            const newRoom = new Room(obj);
            const savedRoom = await newRoom.save();
            return { success: true, data: savedRoom };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    }
};

module.exports = RoomController;
