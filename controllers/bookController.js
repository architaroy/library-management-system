const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            isbn,
            publishedYear,
            description,
            availableCopies,
        } = req.body;

        // Check if book already exists
        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "Book already exists",
            });
        }

        // Create new book
        const book = await Book.create({
            title,
            author,
            category,
            isbn,
            publishedYear,
            description,
            availableCopies,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: book,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// Get All Books
const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const category = req.query.category || "";
        const sort = req.query.sort === "asc" ? 1 : -1;

        let filter = {};

        // Search by Title
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        // Filter by Category
        if (category) {
            filter.category = category;
        }

        const skip = (page - 1) * limit;

        const books = await Book.find(filter)
            .populate("createdBy", "fullName email")
            .sort({ createdAt: sort })
            .skip(skip)
            .limit(limit);

        const totalBooks = await Book.countDocuments(filter);

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks,
            data: books,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// Get Single Book
const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id).populate(
            "createdBy",
            "fullName email"
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: book,
        });

    } catch (error) {

        if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid Book ID",
        });
    }
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// Update Book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        // Only Owner or Admin can update
        if (
            book.createdBy.toString() !== req.user.id &&
            req.user.role !== "Admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this book",
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });

    } catch (error) {

        if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid Book ID",
        });
    }
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        // Only Owner or Admin can delete
        if (
            book.createdBy.toString() !== req.user.id &&
            req.user.role !== "Admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this book",
            });
        }

        await Book.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
        });

    } catch (error) {

         if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid Book ID",
        });
    }
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = {
    addBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};