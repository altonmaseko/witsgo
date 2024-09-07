

const authFailureController = (req, res) => {
    res.send("Something went wrong while trying to authenticate you");
}

const logoutController = (req, res) => {
    req.session.destroy(); // req.user will be made undefined
    res.send("Goodbye!");
}

module.exports = { authFailureController, logoutController }; 