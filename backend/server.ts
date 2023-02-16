import express from "express";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectToDatabase } from "./config/database";

dotenv.config();
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
app.use("/api/notes", import("./routes/notesRoutes"));
app.use("/api/users", import("./routes/usersRoutes"));
app.use("/api/habits", import("./routes/habitsRoutes"));

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
