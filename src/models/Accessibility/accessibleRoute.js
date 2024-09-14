const mongoose = require("mongoose");
const { accessibilityConnection } = require("../../config/connectDB");

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


const AccessibleRoute = accessibilityConnection.model('AccessibleRoute', accessibleRouteSchema);


module.exports = AccessibleRoute;
