const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- GET All Students ---
app.get("/students", async (req, res) => {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const result = await connection.request().query("SELECT * FROM Students");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving students");
  } finally {
    if (connection) await connection.close();
  }
});

// --- GET Student by ID ---
app.get("/students/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const result = await connection.request()
      .input("id", studentId)
      .query("SELECT * FROM Students WHERE student_id = @id");
    
    if (result.recordset.length === 0) return res.status(404).send("Student not found");
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving student");
  } finally {
    if (connection) await connection.close();
  }
});

// --- POST Create Student ---
app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("name", name);
    request.input("address", address);
    
    const result = await request.query(
      "INSERT INTO Students (name, address) VALUES (@name, @address); SELECT SCOPE_IDENTITY() AS student_id;"
    );

    const newId = result.recordset[0].student_id;
    const student = await connection.request().input("id", newId).query("SELECT * FROM Students WHERE student_id = @id");
    res.status(201).json(student.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating student");
  } finally {
    if (connection) await connection.close();
  }
});

// --- PUT Update Student ---
app.put("/students/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, address } = req.body;
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("id", studentId);
    request.input("name", name);
    request.input("address", address);

    const result = await request.query(
      "UPDATE Students SET name = @name, address = @address WHERE student_id = @id"
    );

    if (result.rowsAffected[0] === 0) return res.status(404).send("Student not found");

    const updated = await connection.request().input("id", studentId).query("SELECT * FROM Students WHERE student_id = @id");
    res.json(updated.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating student");
  } finally {
    if (connection) await connection.close();
  }
});

// --- DELETE Student ---
app.delete("/students/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const result = await connection.request()
      .input("id", studentId)
      .query("DELETE FROM Students WHERE student_id = @id");

    if (result.rowsAffected[0] === 0) return res.status(404).send("Student not found");
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting student");
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(port, () => {
  console.log(`Students API running on port ${port}`);
});