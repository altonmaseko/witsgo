const Room = require("../../models/Map/room");
//controller for the room model
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
//method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await Room.find(query);
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
            const doc = await Room.findOneAndUpdate(
                { _id: obj._id },
                {
                    room_name: obj.room_name,
                    building_id: obj.building_id,
                    code:obj.code,
                    type:obj.type,
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
//method to insert a new record
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
