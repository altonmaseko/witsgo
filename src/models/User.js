const mongoose = require('mongoose');
const {
    busDriver,
    admin,
    campusSecurity,
    student } = require('../constants/constants');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    role: {
        type: String,
        enum: [busDriver, admin, student, campusSecurity],
        default: student
    },
    email: {
        type: String,
    },
    googleId: { // this is the unique identifier that google gives to each user
        type: String,
    },
    picture: {
        type: String,
    },
    password: {
        type: String
    },
});

module.exports = mongoose.model("User", UserSchema, "users"); 