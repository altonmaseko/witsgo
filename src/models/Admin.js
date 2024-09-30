const mongoose = require('mongoose');

const { userConnection } = require('../config/connectDB');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

module.exports = userConnection.model("User", AdminSchema, "admins"); 