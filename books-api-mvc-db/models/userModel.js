const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
  // 1. Create User
  static async createUser(userData) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = `
        INSERT INTO Users (username, email) 
        VALUES (@username, @email); 
        SELECT SCOPE_IDENTITY() AS id;
      `;
      const request = connection.request();
      request.input("username", sql.VarChar, userData.username);
      request.input("email", sql.VarChar, userData.email);
      
      const result = await request.query(query);
      const newId = result.recordset[0].id;
      return await this.getUserById(newId);
    } catch (error) {
      console.error("Database error in createUser:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }

  // 2. Get All Users
  static async getAllUsers() {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = "SELECT id, username, email FROM Users";
      const result = await connection.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("Database error in getAllUsers:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }

  // 3. Get User By ID
  static async getUserById(id) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = "SELECT id, username, email FROM Users WHERE id = @id";
      const request = connection.request();
      request.input("id", sql.Int, id);
      
      const result = await request.query(query);
      return result.recordset[0] || null;
    } catch (error) {
      console.error("Database error in getUserById:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }

  // 4. Update User
  static async updateUser(id, updatedData) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = `
        UPDATE Users 
        SET username = @username, email = @email 
        WHERE id = @id
      `;
      const request = connection.request();
      request.input("id", sql.Int, id);
      request.input("username", sql.VarChar, updatedData.username);
      request.input("email", sql.VarChar, updatedData.email);
      
      const result = await request.query(query);
      return result.rowsAffected[0] > 0 ? await this.getUserById(id) : null;
    } catch (error) {
      console.error("Database error in updateUser:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }

  // 5. Delete User
  static async deleteUser(id) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = "DELETE FROM Users WHERE id = @id";
      const request = connection.request();
      request.input("id", sql.Int, id);
      
      const result = await request.query(query);
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Database error in deleteUser:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }

  // 6. Search Users (Task 6)
  static async searchUsers(searchTerm) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = `
        SELECT id, username, email
        FROM Users
        WHERE username LIKE '%' + @searchTerm + '%'
           OR email LIKE '%' + @searchTerm + '%'
      `;
      const request = connection.request();
      request.input("searchTerm", sql.NVarChar, searchTerm);
      
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error("Database error in searchUsers:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }

  // 7. Get Users With Books (Task 7)
  static async getUsersWithBooks() {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const query = `
        SELECT u.id AS user_id, u.username, u.email, b.id AS book_id, b.title, b.author
        FROM Users u
        LEFT JOIN UserBooks ub ON ub.user_id = u.id
        LEFT JOIN Books b ON ub.book_id = b.id
        ORDER BY u.username;
      `;
      const result = await connection.request().query(query);

      // Group the rows by user
      const usersWithBooks = {};
      for (const row of result.recordset) {
        const userId = row.user_id;
        if (!usersWithBooks[userId]) {
          usersWithBooks[userId] = {
            id: userId,
            username: row.username,
            email: row.email,
            books: [],
          };
        }
        // Only add book if book_id is not null
        if (row.book_id !== null) {
          usersWithBooks[userId].books.push({
            id: row.book_id,
            title: row.title,
            author: row.author,
          });
        }
      }
      return Object.values(usersWithBooks);
    } catch (error) {
      console.error("Database error in getUsersWithBooks:", error);
      throw error;
    } finally {
      if (connection) await connection.close();
    }
  }
}

module.exports = User;