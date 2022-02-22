const mongoose = require("mongoose");

const habitsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    habitName: {
      type: String,
      required: [true, "Please provide a habit name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", habitsSchema);
