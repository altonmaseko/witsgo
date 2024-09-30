const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            lat: Number,
            lng: Number
        },
        required: true
    },
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    icon: {
        type: String,
        default: '/images/station.png'
    }
});

module.exports = mongoose.model('Station', stationSchema);
