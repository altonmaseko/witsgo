const mongoose = require('mongoose');

const { userConnection } = require('../config/connectDB');

const {
    busDriver,
    admin,
    campusSecurity,
    student,
    campusControl } = require('../constants/constants');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    role: {
        type: String,
        enum: [busDriver, admin, student, campusSecurity, campusControl],
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

module.exports = userConnection.model("User", UserSchema, "users"); 