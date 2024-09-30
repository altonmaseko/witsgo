const mongoose = require("mongoose");
const { rentalConnection } = require("../../config/connectDB");

const stationSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    scooter_count: {
        type: Number,
        required: true,
        default:0
    },
    bicycle_count: {
        type: Number,
        required: true,
        default:0
    },
    skateboard_count: {
        type: Number,
        required: true,
        default:0
    },

});

const Station = rentalConnection.model('Station', stationSchema);

module.exports = Station