const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    lastStation: {
        type: Schema.Types.ObjectId,
        ref: 'Station'
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
