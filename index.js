const express = require("express");
const app = express();
const PORT = 3000;

// 1. Root Route
app.get("/", (req, res) => {
  res.send("Welcome to Homework API");
});

// 2. Intro Route
app.get("/intro", (req, res) => {
  res.send("Hi, I am a Year 2 student currently learning how to build APIs with Node.js!");
});

// 3. Name Route
app.get("/name", (req, res) => {
  res.send("Isaac"); 
});

// 4. Food Route
app.get("/food", (req, res) => {
  res.send("My favourite foods are Pizza, Sushi, and Chicken Rice.");
});


// 5. Hobbies Route (Returns a JSON array)
app.get("/hobbies", (req, res) => {
  res.json(["coding", "reading", "cycling"]); 
});

// 6. Student Route (Returns a JSON object)
app.get("/student", (req, res) => {
  res.json({
    name: "Alex",
    hobbies: ["coding", "reading", "cycling"],
    intro: "Hi, I'm Alex, a Year 2 student passionate about building APIs!"
  });
});


app.listen(PORT, () => {
  console.log(`Homework server is running on http://localhost:${PORT}`);
});