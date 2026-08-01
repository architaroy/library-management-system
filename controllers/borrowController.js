const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Borrow Book
const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.body;

        // Check if book exists
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        // Check available copies
        if (book.availableCopies === 0) {
            return res.status(400).json({
                success: false,
                message: "Book is not available",
            });
        }

        // Create borrow record
        const borrow = await Borrow.create({
            user: req.user.id,
            book: bookId,
        });

        // Decrease available copies
        book.availableCopies -= 1;
        await book.save();

        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// Return Book
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Check borrow record
        const borrow = await Borrow.findById(id);

        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found",
            });
        }

        // Check if already returned
        if (borrow.status === "Returned") {
            return res.status(400).json({
                success: false,
                message: "Book already returned",
            });
        }

        // Update borrow status
        borrow.status = "Returned";
        borrow.returnDate = new Date();
        await borrow.save();

        // Increase available copies
        const book = await Book.findById(borrow.book);

        if (book) {
            book.availableCopies += 1;
            await book.save();
        }

        return res.status(200).json({
            success: true,
            message: "Book returned successfully",
            data: borrow,
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
    borrowBook,
    returnBook,
};