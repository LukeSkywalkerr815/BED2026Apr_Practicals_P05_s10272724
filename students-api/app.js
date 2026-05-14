const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const studentController = require("./controllers/studentController");
const { validateStudent, validateStudentId } = require("./middlewares/studentValidation");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get("/students", studentController.getAllStudents);
app.get("/students/:id", validateStudentId, studentController.getStudentById);
app.post("/students", validateStudent, studentController.createStudent);
app.put("/students/:id", validateStudentId, validateStudent, studentController.updateStudent);
app.delete("/students/:id", validateStudentId, studentController.deleteStudent);

app.listen(port, () => {
  console.log(`Students API running on port ${port}`);
});