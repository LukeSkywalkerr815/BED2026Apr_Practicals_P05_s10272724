const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json"; 
const routes = ["./app.js"]; // Tells Swagger to look at your main app file for routes

const doc = {
  info: {
    title: "Polytechnic Library API",
    description: "An API for managing library books and user authentication.",
  },
  host: "localhost:3000",
};

swaggerAutogen(outputFile, routes, doc);