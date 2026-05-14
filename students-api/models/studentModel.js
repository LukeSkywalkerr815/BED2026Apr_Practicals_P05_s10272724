const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Student {
  static async getAllStudents() {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const result = await connection.request().query("SELECT * FROM Students");
      return result.recordset;
    } finally {
      if (connection) await connection.close();
    }
  }

  static async getStudentById(id) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const result = await connection.request()
        .input("id", id)
        .query("SELECT * FROM Students WHERE student_id = @id");
      return result.recordset[0] || null;
    } finally {
      if (connection) await connection.close();
    }
  }

  static async createStudent(data) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const result = await connection.request()
        .input("name", data.name)
        .input("address", data.address)
        .query("INSERT INTO Students (name, address) VALUES (@name, @address); SELECT SCOPE_IDENTITY() AS student_id;");
      return await this.getStudentById(result.recordset[0].student_id);
    } finally {
      if (connection) await connection.close();
    }
  }

  static async updateStudent(id, data) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const result = await connection.request()
        .input("id", id)
        .input("name", data.name)
        .input("address", data.address)
        .query("UPDATE Students SET name = @name, address = @address WHERE student_id = @id");
      return result.rowsAffected[0] > 0 ? await this.getStudentById(id) : null;
    } finally {
      if (connection) await connection.close();
    }
  }

  static async deleteStudent(id) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);
      const result = await connection.request()
        .input("id", id)
        .query("DELETE FROM Students WHERE student_id = @id");
      return result.rowsAffected[0] > 0;
    } finally {
      if (connection) await connection.close();
    }
  }
}

module.exports = Student;