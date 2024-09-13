const mongoose = require("mongoose");

const accessibleRouteSchema = new mongoose.Schema({
    route_name: {
        type: String,
        required: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AccessibleRoute', accessibleRouteSchema);
