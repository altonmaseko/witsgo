const mongoose = require("mongoose");
const { userRoutesConnection } = require("../../config/connectDB");
;

const preferencesSchema = new mongoose.Schema({
    preference_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    user_id:{
        type: String, // Reference to the User model
        required: true,
        // ref: 'User' // Assuming you have a User model
    },
    preferences_type:{
        type:String,
        enum:["wheelchair","none"],
        required:true,
        default:"none"
    },
    preferences_value: {
        type: Boolean, // Can store various types of data
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// preferencesSchema.pre('save', async function(next) {
//     // `this` refers to the current document being saved
//     const isValidUser = await User.isUserValid(this.user_id);

//     if (!isValidUser) {
//         const err = new Error('Invalid user_id provided.');
//         return next(err);
//     }
//     next();
// });



const Pref = userRoutesConnection.model('Preferences', preferencesSchema);

module.exports = Pref