const mongoose = require("mongoose");
const { accessibilityConnection } = require("../../config/connectDB");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    wheelchair_friendly: {
        type: Boolean,
        default: false
    },
    ramp_available: {
        type: Boolean,
        default: false
    },
    elevator_nearby: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Location = accessibilityConnection.model('Location', locationSchema);

module.exports = Location;
