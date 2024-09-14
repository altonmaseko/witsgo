const mongoose = require("mongoose");
const { rentalConnection } = require("../../config/connectDB");

const studentSchema = new mongoose.Schema({
    student_number: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    rented_vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


const Student = rentalConnection.model('Student', studentSchema);

module.exports = Student