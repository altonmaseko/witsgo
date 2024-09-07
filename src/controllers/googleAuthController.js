const jwt = require('jsonwebtoken');

const authFailureController = (req, res) => {
    res.send("Something went wrong while trying to authenticate you");
}

const authSuccessController = (req, res) => {

    // AFTER google authentication is successful, we create our own accessToken to store

    const homepage = 'http://127.0.0.1:5501/logintest/';

    const user = req.user;
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "2m" });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    res.redirect(homepage);

    // res.json({ user, success: true });
}

const verifyLoginController = (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.json({
            success: false,
            isLoggedIn: false,
            message: "User is not logged in",
            status: 200
        });
        return;
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                isLoggedIn: false,
                message: "User has invalid jwt",
                status: 200
            });
        }
        res.json({
            user,
            isLoggedIn: true,
            success: true,
            message: "User is logged in",
            status: 200
        });
    });
}


const logoutController = (req, res) => {
    const loginPage = "http://127.0.0.1:5501/logintest/login.html";
    req.session.destroy(); // req.user will be undefined
    res.clearCookie("accessToken");
    res.redirect(loginPage);
}

module.exports = { authFailureController, logoutController, authSuccessController, verifyLoginController }; 