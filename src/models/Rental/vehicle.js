const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    barcode: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "available"
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

module.exports = mongoose.model('Vehicle', vehicleSchema);
