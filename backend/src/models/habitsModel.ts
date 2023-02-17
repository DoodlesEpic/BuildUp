import mongoose from "mongoose";

const habitsSchema = new mongoose.Schema(
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

export default mongoose.model("Habit", habitsSchema);
