import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectToDatabase } from "./config/database";

import notesRouter from "./routes/notesRoutes";
import usersRouter from "./routes/usersRoutes";
import habitsRouter from "./routes/habitsRoutes";

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
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/habits", habitsRouter);

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
