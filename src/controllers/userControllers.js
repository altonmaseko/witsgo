
const User = require('../models/User.js');
const Admin = require('../models/Admin.js');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

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
    // user.faculty = body.faculty ? body.faculty : user.faculty;
    // user.age = body.age ? body.age : user.age;
    if (body.hasOwnProperty('onWheelChair')) {
        user.onWheelChair = body.onWheelChair;
    }

    console.log("body", body);

    // if (body.password) {
    //     const encryptedPassword = CryptoJS.AES.encrypt(body.password, process.env.JWT_SECRET).toString();
    //     // to decrypt
    //     // const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);
    //     user.password = encryptedPassword;
    // }

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
    // req.session.destroy(); // not using session  
    res.clearCookie("accessToken", {
        // httpOnly: true, // trying off for iphone
        sameSite: "None",
        secure: true,
        path: "/",
    });
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

    console.log("ADMIN LOGIN REQUEST", req.body);
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            console.log("ADMIN User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);
        const decryptedPassword = user.password;
        if (decryptedPassword !== password) {
            console.log("ADMIN Incorrect password");
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Valid admin, create a token
        const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie("accessToken", accessToken, {
            // httpOnly: true, // trying off for iphone
            sameSite: "None",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        });

        console.log("ADMIN Login successful");
        res.json({
            success: true,
            message: "Login successful",
            status: 200,
            accessToken
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
};

const adminVerifyController = (req, res) => {
    console.log("/admin/verify");

    const accessToken = req.body.token;

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    //verify the token with jwt
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid admin token");

            return res.status(403).json({
                success: false,
                message: "Failed to authenticate token"
            });
        }

        console.log("Admin token is valid");
        res.status(200).json({
            success: true,
            message: "Token is valid"
        });
    });
};


module.exports = {
    updateUserController,
    getUserController,
    deleteUserController,
    adminLoginController,
    adminVerifyController
};
