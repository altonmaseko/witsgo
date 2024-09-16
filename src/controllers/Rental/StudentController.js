const Student = require("../../models/Rental/rental");

const StudentController = {
    async exists(query) {
        try {
            const doc = await Student.exists(query);
            return doc !== null;
        } catch (error) {
            console.error("Error checking if student exists:", error);
            return false;
        }
    },

    async getDoc(query) {
        try {
            const doc = await Student.find(query);
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Student does not exist." };
            }
        } catch (error) {
            console.error("Error getting student:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async insertRecord(obj) {
        try {
            const doc = await Student.create(obj);
            return { success: true, data: doc };
        } catch (error) {
            console.error("Error inserting student:", error);
            return { success: false, message: "Error occurred." };
        }
    },

    async edits(obj) {
        try {
            const doc = await Student.findOneAndUpdate({ _id: obj._id }, obj, { new: true });
            if (doc) {
                return { success: true, data: doc };
            } else {
                return { success: false, message: "Student does not exist." };
            }
        } catch (error) {
            console.error("Error updating student:", error);
            return { success: false, message: "Error occurred." };
        }
    }
};

module.exports = StudentController;
