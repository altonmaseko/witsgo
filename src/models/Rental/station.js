const mongoose = require("mongoose");
const { rentalConnection } = require("../../config/connectDB");

const Station = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            lat: Number,
            lng: Number
        },
        required: true
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    icon: {
        type: String,
        default: '/images/station.png'
    }
}, { collection: 'Station' }); // Explicitly specify the collection name

const StationModel = rentalConnection.model('Station', Station);

module.exports = StationModel;
