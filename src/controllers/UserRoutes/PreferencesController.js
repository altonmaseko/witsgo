const Preferences = require("../../models/UserRoutes/Preferences");

// Method to check if a record exists
const PreferencesController = {
    async exist(query){
        try {
            const doc = await Preferences.exists(query);
            return doc; // Returns true if a document exists, otherwise false
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

// Method to get a document based on a query
    async getDoc(query){
        try {
            const doc = await Preferences.find(query);
            
            if (doc) {
                // If a document is found, return it
                return { success: true, data: doc };
            } else {
                // If no document is found, return a not found message
                return { success: false, message: "Document does not exist." };
            }
        } catch (error) {
            console.error("Error checking if document exists:", error);
            return false;
        }
    },

    //updates preferenece, or adds if not there already
    async edits(obj){
        try {
            const doc = await Preferences.findOneAndReplace(
                { 
                    user_id: obj.user_id,
                    preferences_type: obj.preference_type,

                 },
                {
                    user_id : obj.user_id,
                    preferences_type:obj.preference_type,
                    preferences_value:obj.preferences_value,
                    updated_at: Date()
                },
                {
                    new: true,
                    upsert: true
                }
            );

            if (!doc) {
                return { success: false, message: "operation_failed" };
            }

            return { success: true, data: doc };
        } catch (error) {
            console.error("Error generating record:", error);
            return { success: false, message: "error_occurred" };
        }

    }
}

module.exports = PreferencesController