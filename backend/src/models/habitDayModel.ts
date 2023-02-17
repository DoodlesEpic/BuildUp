import mongoose from "mongoose";

const habitDaySchema = new mongoose.Schema(
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

export default mongoose.model("HabitDay", habitDaySchema);
