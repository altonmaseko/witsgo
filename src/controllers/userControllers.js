
const User = require('../models/User.js');
const CryptoJS = require('crypto-js');

require("dotenv").config();

const updateUserController = async (req, res) => {
    const { email } = req.params;
    const body = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.json({
            success: false,
            message: "User not found",
            status: 404
        });
        return;
    }

    user.firstName = body.firstName ? body.firstName : user.firstName;
    user.lastName = body.lastName ? body.lastName : user.lastName;
    user.role = body.role ? body.role : user.role;
    user.email = body.email ? body.email : user.email;
    user.picture = body.picture ? body.picture : user.picture;
    user.degree = body.degree ? body.degree : user.degree;
    user.age = body.age ? body.age : user.age;
    user.onWheelChair = body.onWheelChair ? body.onWheelChair : user.onWheelChair;
    console.log("body", body);
    if (body.password) {
        const encryptedPassword = CryptoJS.AES.encrypt(body.password, process.env.JWT_SECRET).toString();
        // to decrypt
        // const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);
        user.password = encryptedPassword;
    }

    await user.save();

    res.json({
        success: true,
        message: "User updated successfully",
        status: 200
    });


}

const getUserController = async (req, res) => {
    console.log("get user request", req.params);

    const { email } = req.params;
    const user = await User.findOne({ email });


    if (!user) {
        res.json({
            success: false,
            message: "User not found",
            status: 404
        });
        return;
    }

    res.json({
        success: true,
        user,
        status: 200
    });
}

const deleteUserController = async (req, res) => {
    console.log("DELETE USER REQUEST", req.params);
    const { email } = req.params;
    const user = await User.findOne({
        email
    });

    if (!user) {
        res.json({
            success: false,
            message: "User not found",
            status: 404
        });
        return;
    }

    await user.deleteOne();

    // Logout the user
    req.session.destroy(); // req.user will be undefined
    res.clearCookie("accessToken");
    res.clearCookie("connect.sid");

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json({
        success: true,
        message: "User deleted successfully",
        status: 200
    });
}

module.exports = { updateUserController, getUserController, deleteUserController };
