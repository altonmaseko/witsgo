const mongoose = require("mongoose");
const { userRoutesConnection } = require("../../config/connectDB");
const generate = require("../../misc/generateUUID");


const navigationHistorySchema = new mongoose.Schema({
    history_id: {
        type: String,
        default:generate(),
        required: true
    },
    user_id:{
        type: String, // Reference to the User model
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    route_id:{
        type: String, // Reference to the User model
        required: true,
        ref: 'Routes' // Assuming you have a User model
    },
    end_time: {
        type: Date,
        required:true,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// navigationHistorySchema.pre('save', async function(next) {
//     // `this` refers to the current document being saved
//     const isValidRoute = await Routes.isRouteValid(this.route_id);

//     if (!isValidRoute) {
//         const err = new Error('Invalid route_id provided.');
//         return next(err);
//     }
//     next();
// });



const NavHis = userRoutesConnection.model('NavigationHistory', navigationHistorySchema);

module.exports = NavHis
