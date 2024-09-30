const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('Rental', rentalSchema);
