const mongoose = require("mongoose");
const Building = require("./building");
const { mapConnection } = require("../../config/connectDB");

const amenitySchema = new mongoose.Schema({
    amenity_type: {
        type: String,
        required: true
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Building'
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

amenitySchema.pre('save', async function(next) {
    const buildingExists = await Building.exists({ _id: this.building_id });

    if (!buildingExists) {
        const err = new Error('Invalid building_id provided.');
        return next(err);
    }
    next();
});


const Amenity = mapConnection.model('Amenity', amenitySchema);

module.exports = Amenity
