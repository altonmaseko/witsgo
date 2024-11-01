/**
 * Represents a stop in the transportation system.
 * @class Stop
 * @property {String} stop_name - The name of the stop.
 * @property {String} location - The location of the stop.
 */

const mongoose = require('mongoose');
const { transporationConnection } = require('../../config/connectDB');

const StopSchema = new mongoose.Schema({
    stop_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Stop = transporationConnection.model('Stop', StopSchema);

module.exports = Stop