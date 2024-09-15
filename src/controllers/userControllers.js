
const User = require('../models/User');

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
    user.password = body.password ? body.password : user.password;

    await user.save();

    res.json({
        success: true,
        message: "User updated successfully",
        status: 200
    });


}

const getUserController = async (req, res) => {
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

module.exports = { updateUserController, getUserController };
