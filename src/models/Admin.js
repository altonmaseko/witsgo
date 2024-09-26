const mongoose = require('mongoose');

const { userConnection } = require('../config/connectDB');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = userConnection.model("User", AdminSchema, "admins"); 