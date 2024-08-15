const mongoose = require('mongoose'); // needed

// In Mongodb, a Database has Collections, and Collections have Documents.
// A collection is an array of documents!
// A document is a single javascript object! 

//[Step 2] Two simple steps, (1) Define structure (2) Make it available to other files

// A schema is like class that allows you to create new objects.
// Whenever you use this schema to create a new document/object, it is stored
// in a collection called 'users'. 
// When you use the schema for the first time, the users collection is 
// automatically created.

const UserSchema = new mongoose.Schema({ // (1) first define structure of data
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 69 // its value is 69, unless changed
    },
    account_details: {
        account_active: { type: Boolean, default: true },
        reason: { type: String, default: "" },
        infractions: { type: Number, default: 0 }
    },

});

module.exports = mongoose.model("User", UserSchema, "users"); // (2) then make it available to other files

// 'module.exports' defines what other files get when they reference this file. This is javascript not mongodb.