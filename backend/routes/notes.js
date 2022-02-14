const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get notes" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create note" });
});

router.put("/:id", (req, res) => {
  res.json({ message: `Update note ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `Delete note ${req.params.id}` });
});

module.exports = router;
