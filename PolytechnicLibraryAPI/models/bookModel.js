const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getAllBooks() {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request().query("SELECT * FROM Books");
  return result.recordset;
}

async function updateBookAvailability(bookId, availability) {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request()
    .input("bookId", sql.Int, bookId)
    .input("availability", sql.Char, availability)
    .query("UPDATE Books SET availability = @availability WHERE book_id = @bookId");
  return result.rowsAffected[0] > 0;
}

module.exports = { getAllBooks, updateBookAvailability };