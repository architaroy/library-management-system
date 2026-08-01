const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,

    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const User = mongoose.model("User", userSchema);

module.exports = User;