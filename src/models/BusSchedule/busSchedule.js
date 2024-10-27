const mongoose = require('mongoose');
const { busScheduleConnection } = require("../../config/connectDB");

// Define the schema for a route detail
const routeDetailSchema = new mongoose.Schema({
    route: { 
        type: String,         // Route details (e.g., "AMIC > NSW > WJ > WEC > EOH > KNK > AMIC")
        required: true       // This field is required
    },
    time: { 
        type: String,         // Operating hours (e.g., "06:30 to 17:00")
        required: true       // This field is required
    },
    interval: { 
        type: String,         // Frequency (e.g., "Every 15 – 20 minutes, 'drop & go'")
        required: true       // This field is required
    }
});

// Define the schema for a bus route
const routeSchema = new mongoose.Schema({
    name: { 
        type: String,         // Name of the route (e.g., "Route 1 - Full Circuit")
        required: true       // This field is required
    },
    details: [routeDetailSchema] // An array of route details
}, { timestamps: true }); // Optional: Automatically create 'createdAt' and 'updatedAt' fields

// Create a Mongoose model using the schema
const Route = busScheduleConnection.model('Route', routeSchema, 'Routes'); // 'Routes' is the name of the collection

// Export the model so it can be used in other parts of the application
module.exports = Route;
