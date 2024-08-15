// You need mongodb on your computer, refer to howTo/mongodb.docx file.
// OR Watch video OR ask chatgpt how to set up mongodb and install mongodb compass app.

// [Step 0] Initial Setup. Function to connect to mongodb database running on your computer.
const mongodb = require("mongodb"); // needed
const mongoose = require("mongoose"); // mongoose simplifies interaction with mongodb
const connectDB = async () => {
    try {
        // Database is called hexago. If it doesnt exist, it creates one called hexago
        await mongoose.connect("mongodb://localhost:27017/hexago")
    } catch (error) {
        console.log(error);
    }
}


// In Mongodb, a Database has Collections, and Collections have Documents.
// A collection is an array of documents.
// A document is a single javascript object. 

// [Step 1] Get the User file from models folder (no need for '.js'). 
// ---------------------------
// The modules folder has User.js, and User.js exports something, 
// that is what we are getting.
// If modules folder had Example.js as well, we could get it
// by saying const Example = require("./modules/Example.js");.
const User = require("../models/User"); // [Step 1]

// [Step 2] Now look at models/User.js to see how to create simple structure 
// to store in database. Navigate to User.js first then come back.

// Asynchronous functions are needed to access databases [not just mongodb]
// [Step 3] Lets see how to create, edit and delete
const asyncFunction = async () => {

    await connectDB(); // connect to database

    // ==========================================================================================
    // *** CREATE A DOCUMENT [document is like a javascript object] and add to collection called 'users'.
    await User.create({ // created and saved to database inside 'users' collection.
        name: 'Bob',
        age: 30,
        account_details: {
            account_active: true,
            reason: 'New user',
            infractions: 0
        }
    });

    // ==========================================================================================
    // *** GET DOCUMENT(S)

    // Get first user with name = "Bob":
    const bobUser = await User.findOne({ name: "Bob" });

    // Get first user with name = "Jimmy" and age = 90:
    const jimmyUser = await User.findOne({ name: "Jimmy", age: 90 });

    // Get all users who are 10 years old (an array of objects is returned): 
    const allNinety = await User.find({ age: 10 });

    // Edit the document [edit just like a js object]
    bobUser.name = "newBobName";
    bobUser.age = 9;

    // After editing, save it
    await bobUser.save();
    console.log("bobUser: ========================");
    console.log(bobUser);

    // ==========================================================================================
    // *** DELETE DOCUMENT(S)

    await User.deleteOne({ name: "Alton" }); // delete first user with name = "Alton"
    await User.deleteMany({ age: 60 }); // delete all user with age = 60

    // ==========================================================================================
    // As simple as that, lets create a new user, edit them and delete them:

    await User.create({
        name: 'NewUser',
        age: 24,
        account_details: {
            account_active: true,
            reason: 'New user init',
            infractions: 69
        }
    })
    const newUser = await User.findOne({ name: "NewUser" });
    newUser.account_details.account_active = false;
    await newUser.save();
    console.log("newUser: ========================");
    console.log(newUser);
    await User.deleteOne({ name: "NewUser" });

    // ==========================================================================================
    // *** NOW CHECK THE MONGODB COMPASS APP:
    // * Open app
    // * Click 'Connect'
    // * Find 'hexago' database on the left
    // ------------
    // If you ran this file once, you should just see one collection with
    // one document, a User with name: "newBobName".
    // Remember, we never create others, and we deleted NewUser.

}
// This is just javascript: when you call asyncFunction(), all the things in there will be executed.
asyncFunction(); // run the function

// TO run the file, open the project (github repository, after cloning) in vs code.
// Open terminal and navigate to howTo folder ('cd howTo'), then
// type 'node mongodb.js'