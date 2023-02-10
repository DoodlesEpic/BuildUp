const express = require("express");
const helmet = require("helmet");
const path = require("path");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectToDatabase } = require("./config/database");
const port = process.env.PORT || 5000;

// Initialize database connection
connectToDatabase();

// Initialize express
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use("/api/notes", require("./routes/notesRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/habits", require("./routes/habitsRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Frontend only served in production"));
}

// Error middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
