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
    amountOfScooters: {
        type: Number,
        required: true
    },
    amountOfBicyles: {
        type: Number,
        required: true
    },
    amountOfScateboards: {
        type: Number,
        required: true
    },

});

const Station = rentalConnection.model('Station', stationSchema);

module.exports = Station