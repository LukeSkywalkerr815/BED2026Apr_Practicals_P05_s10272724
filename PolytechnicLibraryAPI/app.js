const express = require("express");
const { registerUser, login } = require("./controllers/authController");
const { getBooks, updateAvailability } = require("./controllers/bookController");
const verifyJWT = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());

// Public Routes (Authentication)
app.post("/register", registerUser);
app.post("/login", login);

// Protected Routes
app.get("/books", verifyJWT, getBooks);
app.put("/books/:bookId/availability", verifyJWT, updateAvailability);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Polytechnic Library API is running on port ${PORT}`);
});