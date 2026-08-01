const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const borrowRoutes = require("./routes/borrowRoutes");

const userRoutes = require("./routes/userRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

//Routes

app.use ("/api/auth", authRoutes);
app.use("/api/books" , bookRoutes);

app.use("/api/borrow", borrowRoutes);
app.use("/api/users", userRoutes);

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;