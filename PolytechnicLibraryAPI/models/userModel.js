const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getUserByUsername(username) {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request()
    .input("username", sql.VarChar, username)
    .query("SELECT * FROM Users WHERE username = @username");
  return result.recordset[0];
}

async function createUser(username, passwordHash, role) {
  const pool = await sql.connect(dbConfig);
  await pool.request()
    .input("username", sql.VarChar, username)
    .input("passwordHash", sql.VarChar, passwordHash)
    .input("role", sql.VarChar, role)
    .query("INSERT INTO Users (username, passwordHash, role) VALUES (@username, @passwordHash, @role)");
}

module.exports = { getUserByUsername, createUser };