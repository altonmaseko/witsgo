const mongoose = require('mongoose');
const { rentalConnection } = require("../../config/connectDB");


const vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    lastStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    }
});

const Vehicle = rentalConnection.model('Vehicle', vehicleSchema, 'vehicles');

module.exports = Vehicle
