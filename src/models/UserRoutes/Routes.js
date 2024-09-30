const mongoose = require('mongoose');
const generateShortUUID = require('../../misc/generateUUID');

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  }
});

const routeSchema = new mongoose.Schema({
  route_id:{
    type:String,
    required:true,
    default:generateShortUUID()
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true,
  },
  start_location: {
    type: locationSchema,
    required: true,
  },
  end_location: {
    type: locationSchema,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  route_data: {
    type: String, // or other type depending on your structure
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
