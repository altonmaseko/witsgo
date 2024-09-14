/**
 * Represents a vehicle in the transportation system.
 * @class Vehicle
 * @property {String} vehicle_number - The number of the vehicle.
 * @property {String} vehicle_type - The type of the vehicle (e.g., bus, shuttle).
 */

const mongoose = require('mongoose');
const { transporationConnection } = require('../../config/connectDB');

const VehicleSchema = new mongoose.Schema({
    vehicle_number: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
        required: true
    }
});


const Vehicle = transporationConnection.model('Vehicle', VehicleSchema);

module.exports = Vehicle