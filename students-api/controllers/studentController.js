const Student = require("../models/studentModel");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving students" });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving student" });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Error creating student" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.updateStudent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating student" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const success = await Student.deleteStudent(req.params.id);
    if (!success) return res.status(404).json({ error: "Student not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
};