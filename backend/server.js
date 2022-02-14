const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.get("/api/habits", (req, res) => {
  res.json({ message: "Get habits" });
});

app.get("/api/notes", (req, res) => {
  res.json({ message: "Get notes" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
