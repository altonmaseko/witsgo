const mongoose = require("mongoose");
const { accessibilityConnection, rentalConnection } = require("../../config/connectDB");

const rentalSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    rental_start_time: {
        type: Date,
        default: Date.now
    },
    rental_end_time: {
        type: Date,
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
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

const Rental = rentalConnection.model('Rental', rentalSchema);

module.exports = Rental