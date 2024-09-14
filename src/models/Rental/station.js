const mongoose = require("mongoose");
const { rentalConnection } = require("../../config/connectDB");

const stationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
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

const Station = rentalConnection.model('Station', stationSchema);

module.exports = Station