const UserRoute = require("../../models/Map/route");
// Method to check if a document exists
const UserRouteController = {
    async exist(query) {
        try {
            const doc = await UserRoute.exists(query);
            return doc; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },
// Method to get a document based on a query
    async getDoc(query) {
        try {
            const doc = await UserRoute.find(query);
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
// Method to edit an existing record
    async edits(obj) {
        try {
            const doc = await UserRoute.findOneAndUpdate(
                { _id: obj._id },
                {
                    route_name: obj.route_name,
                    distance: obj.distance,
                    estimated_time: obj.estimated_time,
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
// Method to insert a new record
    async insertRecord(obj) {
        try {
            const newRoute = new UserRoute(obj);
            const savedRoute = await newRoute.save();
            return { success: true, data: savedRoute };
        } catch (error) {
            console.error("Error inserting record:", error);
            return { success: false, message: "Error occurred" };
        }
    }
};

module.exports = UserRouteController;
