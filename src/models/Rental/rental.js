const mongoose = require('mongoose');
const { rentalConnection } = require("../../config/connectDB");


const rentalSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming a User model exists
        required: true
    },
    rentedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnedAt: {
        type: Date
    }
});

const Rental = rentalConnection.model('Rental', rentalSchema, 'rentals');

module.exports = Rental;
