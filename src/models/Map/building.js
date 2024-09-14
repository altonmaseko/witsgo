const mongoose = require("mongoose");
const { mapConnection } = require("../../config/connectDB");

const buildingSchema = new mongoose.Schema({
    building_name: {
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
    created_at: {
        type: Date,
        default: Date.now
    }
});


const Building = mapConnection.model('Building', buildingSchema);

module.exports = Building
