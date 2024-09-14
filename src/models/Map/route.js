const mongoose = require("mongoose");
const { mapConnection } = require("../../config/connectDB");

const routeSchema = new mongoose.Schema({
    route_name: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    estimated_time: {
        type: Number,  // in minutes
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Assume a function to validate the route
routeSchema.statics.isRouteValid = async function(routeId) {
    const route = await this.findById(routeId);
    return !!route;
};

const Route = mapConnection.model('Route', routeSchema);
module.exports = Route

