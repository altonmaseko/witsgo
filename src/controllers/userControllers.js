
const User = require('../models/User.js');
const Admin = require('../models/Admin.js');
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
    user.faculty = body.faculty ? body.faculty : user.faculty;
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

// ADMIN STUFF =====================================

const adminLoginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
        res.json({
            success: false,
            message: "User not found",
            status: 404
        });
        return;
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
        res.json({
            success: false,
            message: "Incorrect password",
            status: 401
        });
        return;
    }

    // if reach this point, user is valid admin

    // create a token to indicate that the user is logged in
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        // path: "/",
        // maxAge: 1000 * 60 * 4 // 4 minutes
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    });


}


module.exports = { updateUserController, getUserController, deleteUserController, adminLoginController };
