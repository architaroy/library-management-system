const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        publishedYear: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        availableCopies: {
            type: Number,
            required: true,
            default: 1,
            min: 0,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: false,
        },
    }
);

module.exports = mongoose.model("Book", bookSchema);