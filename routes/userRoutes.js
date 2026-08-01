const express = require("express");
const router = express.Router();

const {
    getProfile,
    updateProfile,
    getBorrowedBooks,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// My Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, updateProfile);

// My Borrowed Books
router.get("/borrowed-books", authMiddleware, getBorrowedBooks);

module.exports = router;