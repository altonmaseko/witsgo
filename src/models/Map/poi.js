const mongoose = require("mongoose");
const { mapConnection } = require("../../config/connectDB");

const pointOfInterestSchema = new mongoose.Schema({
    poi_name: {
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

const POI = mapConnection.model('PointOfInterest', pointOfInterestSchema);

module.exports = POI