const express = require("express");
const router = express.Router();

const { addBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,

 } = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");

//Add router
router.post("/", authMiddleware, addBook);

//get all bookks
router.get("/" , getAllBooks);

//get single Book
router.get("/:id" , getSingleBook);

//update book
router.put("/:id", authMiddleware, updateBook);

//delete Book
router.delete("/:id" , authMiddleware,deleteBook);

module.exports = router;