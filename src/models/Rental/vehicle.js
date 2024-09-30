const mongoose = require("mongoose");
const { rentalConnection } = require("../../config/connectDB");

const vehicleSchema = new mongoose.Schema({
    vehicle_id: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    // status: {
    //     type: String,
    //     default: "available"
    // },
    isAvailable: {
        type: Boolean,
        default: true
    },
    current_station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
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

const Vehicle = rentalConnection.model('Vehicle', vehicleSchema);

module.exports = Vehicle