const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name"],
        maxLength: [
            100,
            `A user's name must be equal or less than 100 characters`,
        ],
        minLength: [5, `A user's name must be equal or more than 5 characters`],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A user must have an email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        trim: true,
        minLength: [8, "A password must be equal or more than 8 characters"],
    },
    confirmPassword: {
        type: String,
        required: [true, "Please enter a confirm password"],
        trim: true,
        minLength: 8,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
