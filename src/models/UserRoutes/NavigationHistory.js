const mongoose = require("mongoose");
const Routes = require("./Routes");const { userRoutesConnection } = require("../../config/connectDB");
;


const navigationHistorySchema = new mongoose.Schema({
    history_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    route_id:{
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true,
        ref: 'Routes' // Assuming you have a User model
    },
    start_time: {
        type: Date,
        required:true,
    },
    end_time: {
        type: Date,
        required:true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

navigationHistorySchema.pre('save', async function(next) {
    // `this` refers to the current document being saved
    const isValidRoute = await Routes.isRouteValid(this.route_id);

    if (!isValidRoute) {
        const err = new Error('Invalid route_id provided.');
        return next(err);
    }
    next();
});



const NavHis = userRoutesConnection.model('NavigationHistory', navigationHistorySchema);

module.exports = NavHis
