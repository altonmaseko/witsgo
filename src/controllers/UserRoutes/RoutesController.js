const Routes = require("../../models/UserRoutes/Routes");


const RoutesController = {
    // Check if a document exists based on the query
    async exist(query) {
        try {
            const doc = await Routes.exists(query);
            return doc !== null; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    // Retrieve a document based on the query
    async getDoc(query) {
        try {
            const doc = await Routes.findOne(query);

            if (doc) {
                // If a document is found, return it
                return { success: true, data: doc };
            } else {
                // If no document is found, return a not found message
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error retrieving document:", error);
            return { success: false, message: "Error occurred while retrieving document." };
        }
    },

    // Updates the route or adds a new one if not present
    async edits(obj) {
        try {
            const doc = await Routes.findOneAndReplace(
                {
                    route_id: obj.route_id // Use route_id to find and replace
                },
                {
                    user_id: obj.user_id,
                    start_location: obj.start_location,
                    end_location: obj.end_location,
                    duration: obj.duration,
                    route_data: obj.route_data,
                    created_at: Date() // You might want to consider using a different method to handle timestamps
                },
                {
                    new: true, // Return the modified document
                    upsert: true // Create a new document if no document matches
                }
            );

            if (!doc) {
                return { success: false, message: "Operation failed." };
            }

            return { success: true, data: doc };
        } catch (error) {
            console.error("Error generating record:", error);
            return { success: false, message: "Error occurred while processing request." };
        }
    }
}

module.exports = RoutesController;
