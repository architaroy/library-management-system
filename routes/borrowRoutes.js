const express = require("express");
const router = express.Router();

const { borrowBook,
    returnBook,

} = require("../controllers/borrowController");
const authMiddleware = require("../middleware/authMiddleware");

// Borrow Book
router.post("/", authMiddleware, borrowBook);

// Return Book
router.put("/:id/return", authMiddleware, returnBook);

module.exports = router;