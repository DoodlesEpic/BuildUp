const mongoose = require("mongoose");

const habitDaySchema = mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Habit",
    },
    day: {
      type: Date,
      required: [true, "Please provide a day for this habit day"],
    },
    status: {
      type: Boolean,
      required: [true, "Please provide a status for this habit day"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HabitDay", habitDaySchema);
