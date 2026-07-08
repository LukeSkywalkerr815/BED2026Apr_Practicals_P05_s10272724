const { getAllBooks, updateBookAvailability } = require("../models/bookModel");

async function getBooks(req, res) {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateAvailability(req, res) {
  const bookId = req.params.bookId;
  const { availability } = req.body;

  try {
    if (!['Y', 'N'].includes(availability)) {
        return res.status(400).json({ message: "Availability must be Y or N" });
    }

    const success = await updateBookAvailability(bookId, availability);
    if (!success) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book availability updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getBooks, updateAvailability };