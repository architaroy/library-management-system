const User = require("../models/User");
const Borrow = require("../models/Borrow");

// My Profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const { fullName, phoneNumber } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                fullName,
                phoneNumber,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// My Borrowed Books
const getBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await Borrow.find({
            user: req.user.id,
        }).populate("book");

        return res.status(200).json({
            success: true,
            count: borrowedBooks.length,
            data: borrowedBooks,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getBorrowedBooks,
};