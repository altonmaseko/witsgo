const mongoose = require("mongoose");
const { mapConnection } = require("../../config/connectDB");
const generateUUID = require("../../misc/generateUUID");


const buildingSchema = new mongoose.Schema({
    building_id:{
        type: String,
        unique: true,
        default: generateUUID
    },
    building_name: {
        type: String,
        required: true
    },
    code: {
        type:String,
        required:false,
        default:null
    },
    campus:{
        type: ["west_campus","east_campus","parktown"],
        required: true
    },
    type:{
        type:["gatehouse","building","food","library"],
        required:true,
        default:"building"
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


const Building = mapConnection.model('Building', buildingSchema);

module.exports = Building
