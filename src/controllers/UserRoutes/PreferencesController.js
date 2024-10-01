const Preferences = require("../../models/UserRoutes/Preferences");

// Method to check if a record exists
const PreferencesController = {
    async exists(query) {
        try {
            const exists = await Preferences.exists(query);
            return exists; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    // Method to get a document based on a query
    async getDoc(query) {
        try {
            const docs = await Preferences.find(query);
            
            if (docs.length > 0) {
                // If documents are found, return them
                return { success: true, data: docs };
            } else {
                // If no documents are found, return a not found message
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error retrieving document:", error);
            return { success: false, message: "Error occurred while retrieving document." };
        }
    },

    // Updates preference, or adds if not present already
    async edits(obj) {
        try {
            const doc = await Preferences.findOneAndReplace(
                { 
                    user_id: obj.user_id
                },
                {
                    user_id: obj.user_id,
                    preferences_type: obj.preferences_type,
                    preferences_value: obj.preferences_value,
                    updated_at: Date.now() // Use Date.now() for the current date
                },
                {
                    new: true,
                    upsert: true
                }
            );

            if (!doc) {
                return { success: false, message: "Operation failed" };
            }

            return { success: true, data: doc };
        } catch (error) {
            console.error("Error editing record:", error);
            return { success: false, message: "Error occurred while editing record." };
        }
    }
}

module.exports = PreferencesController;
