const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use("/api/notes", require("./routes/notesRoutes"));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
