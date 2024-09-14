
/**
 * Represents a route in the transportation system.
 * @class Route
 * @property {String} route_name - The name of the route.
 * @property {Array} stops - The list of stops along the route.
 */
const mongoose = require('mongoose');
const { transporationConnection } = require('../../config/connectDB');

const RouteSchema = new mongoose.Schema({
    route_name: {
        type: String,
        required: true
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop',
        required: true
    }]
});


const Route = transporationConnection.model('Route', RouteSchema);

module.exports = Route
