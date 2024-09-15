const mongoose = require("mongoose");
const Building = require("./building");
const { mapConnection } = require("../../config/connectDB");

const roomSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Building'
    },
    code:{
        type:String,
        required: true
    },
    type:{
        type:["tutorial","lecture_hall"],
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

roomSchema.pre('save', async function(next) {
    const buildingExists = await Building.exists({ _id: this.building_id });

    if (!buildingExists) {
        const err = new Error('Invalid building_id provided.');
        return next(err);
    }
    next();
});


const Room = mapConnection.model('Room', roomSchema);

module.exports = Room