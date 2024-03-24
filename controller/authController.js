const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json({
            status: "Success",
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error,
        });
    }
};
